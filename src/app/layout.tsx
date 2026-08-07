import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Vetro — Collect, watch, read and remember",
  description:
    "A local-first Android media library for anime, manga, manhwa, movies and TV. Track progress, stream or download, read offline, and sync with MyAnimeList, AniList or Shikimori.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
