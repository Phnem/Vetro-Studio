---
name: vetro-chunked-download
description: Implement a resumable, verified, multi-connection file downloader for Android/JVM (OkHttp + coroutines) that pulls 1 MB chunks from a shared queue - the approach behind Vetro's in-app updater. Use when a big file (APK update, model, archive) downloads slowly over one connection, or when downloads must survive interruptions and be verified before use.
---

# Vetro chunked download — implementation skill

Goal: a `ChunkedDownloader` that downloads a file of known size over several connections, resumes after any
interruption, never exposes a half-written file, and verifies size and SHA-256 before the file gets its final name.
The full reference implementation (compiled and tested) is in `GUIDE.txt` of the same archive: copy it, then adapt
names. Do not re-derive the algorithm from scratch.

## 1. Measured, so you know what to expect

Real release APK (38.4 MB) from GitHub's CDN, one home connection, 5 runs per method, methods interleaved
(order rotated each run), SHA-256 verified on every run:

| Method | median | MB/s |
| --- | --- | --- |
| single stream | 47.3 s | 0.77 |
| 6 equal parts (classic split) | 9.8 s | 3.74 |
| **6 connections, 1 MB chunk queue (this)** | **10.2 s** | **3.61** |

About 4.6–4.7× faster than one stream. On this network the classic equal-parts split was within noise of the chunk
queue (it was even 3 % ahead at the median). Do not promise more than that: the queue's extra value is behavioural
(resume from the first missing chunk, slow-connection replacement, no stitched tail), not a measured speed-up here.

## 2. Requirements

- Verified with Kotlin 2.4.21, JVM 21, OkHttp 5.4.0, kotlinx-coroutines 1.10.2 (other versions untested; the code
  uses OkHttp 5's non-null `response.body`, with OkHttp 4 write `response.body!!`).
- **The OkHttp client must be HTTP/1.1 only**: `OkHttpClient.Builder().protocols(listOf(Protocol.HTTP_1_1))`.
  With HTTP/2 all parallel requests to one host are multiplexed over one connection and there is no gain.

## 3. Behaviour spec (implement exactly this)

Inputs: `DownloadTarget(id, url, sizeBytes, sha256?)`, `dir`, `connections = 6`, `chunkBytes = 1 MB`,
`parallelMinBytes = 4 MB`, `slowChunkMs = 15 000`, `bufferSize = 64 KB`.

1. If the final file already exists → return it.
2. **Parallel path** only if `connections > 1` and `sizeBytes >= parallelMinBytes`. Otherwise the single-stream path
   (with resume of one `.part` via `Range: bytes=N-`).
3. Probe once: `GET url` with `Range: bytes=0-0`. If the answer is **HTTP 200** (not 206) the server ignores Range →
   delete `.part`/map and fall back to the single-stream path. Otherwise remember the **final URL after redirects**
   (`response.request.url`) and use it for all chunk requests: going through GitHub's redirect for every chunk is
   expensive.
4. Create `name.part` at full length (`RandomAccessFile.setLength(total)`); chunk `i` is written at offset
   `i * chunkBytes` through a shared `FileChannel`. No final stitching pass.
5. Keep `name.part.map`: first line `v1 <total> <chunkBytes>`, then one line per **finished** chunk index
   (append after the chunk is fully written, under a lock). On start, if `.part` has the right length and the map
   header matches → resume: skip the listed chunks, count them as done. Otherwise start over. A half-written chunk
   restarts from its beginning.
6. A `Channel<Int>` holds the pending chunk indices; `min(connections, pending)` coroutines (`async`) pull from it.
   A worker that becomes free takes the next chunk — **this is the whole point**: a slow connection is responsible
   for one chunk, not for a share of the file.
7. Per chunk (`Range: bytes=start+have-end`): on `200` → `RangeIgnoredException`; on `400/401/403/410` → the signed
   CDN URL expired: re-probe and count it as a failed attempt; other non-2xx → `IOException`. Read in 64 KB blocks,
   write at the offset, add to a shared `AtomicLong`. Retries: up to 4 attempts with `1 s × attempt` pause,
   continuing from the **same byte** (`have`). If one attempt on a chunk exceeds `slowChunkMs`, abort it and continue
   with a fresh connection (max 8 such restarts).
8. Progress comes from **one** ticker coroutine (every 250 ms) reading the atomic counter — never from the workers.
   Single-stream path: callback every 128 KB.
9. After all chunks: delete the map, verify (`length == sizeBytes`, and SHA-256 if given; on mismatch delete the file
   and throw `IntegrityException`), then rename `.part` → final name. The final name appears **only** for a complete,
   verified file.
10. Cancellation must propagate (`CancellationException` is never swallowed); `.part` and map stay for resume.
11. Leftover files of an older layout (`.part.N`) are deleted on start; `cleanExcept(keepId)` removes old versions.

## 4. What to build

1. `ChunkedDownloader.kt` + `DownloadTarget` + `IntegrityException` from `GUIDE.txt`.
2. A thin integration for the user's case. For an app updater: query the release (GitHub API gives `size` and
   `digest: "sha256:…"` per asset), call `download`, **verify the APK signature matches your own before
   installing**, then hand it to `PackageInstaller`. Run it from WorkManager / a foreground service so it does not
   depend on a screen's lifetime; surface progress from the callback.
3. Tests (MockWebServer): (a) happy path with SHA match, (b) server answers 200 to a Range request → fallback,
   (c) kill mid-way and resume: second run starts from the recorded chunks, (d) wrong SHA → file deleted +
   `IntegrityException`, (e) expired URL (403 once) → re-probe and success, (f) one chunk stalls → replaced.

## 5. Acceptance checklist

- [ ] `protocols(HTTP_1_1)` on the client.
- [ ] Final file name never exists for a partial download.
- [ ] Kill the process at 40 % → restart → progress starts near 40 %, not at 0.
- [ ] Server without Range support still downloads (single stream).
- [ ] SHA mismatch deletes the file.
- [ ] Progress callback is never called from two threads at once.
- [ ] Cancelling the coroutine stops all workers promptly.

## 6. Be a good citizen

Six connections to one host is already plenty; do not raise it blindly. Consider fewer connections (or one) on
metered networks if the user asks for it. Always keep size + hash verification.

Licence: GPL-3.0 (Vetro Modules).
