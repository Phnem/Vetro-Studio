const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealConfigurations = [
  { selector: '.ecosystem-hero .reveal', animation: 'reveal-scale-up', stagger: 90 },
  { selector: '.products .reveal', animation: 'reveal-from-left', stagger: 110 },
  { selector: '.principle.reveal, .look-statement.reveal', animation: 'reveal-from-left' },
  { selector: '.look-hero-copy', animation: 'reveal-from-left' },
  { selector: '.look-hero-shot', animation: 'reveal-from-right', delay: 120 },
  { selector: '.look-preview-copy', animation: 'reveal-from-left' },
  { selector: '.look-preview-media', animation: 'reveal-from-right', delay: 120 },
  { selector: '.quick-look > div', animation: 'reveal-scale-up', stagger: 120 },
  { selector: '.formats > .eyebrow, .formats > h2', animation: 'reveal-from-left', stagger: 80 },
  { selector: '.format-groups article', animation: 'reveal-scale-up', stagger: 110 },
  { selector: '.native-proof > div', animation: 'reveal-from-left', stagger: 120 },
  { selector: '.native-stack span', animation: 'reveal-scale-up', stagger: 55 },
  { selector: '.benchmark-note', animation: 'reveal-fade', delay: 180 },
  { selector: '.benchmarks-intro, .benchmark-footnote', animation: 'reveal-from-left' },
  { selector: '.privacy-panel > div', animation: 'reveal-scale-up', stagger: 120 },
  { selector: '.look-feature', animation: 'reveal-from-left', stagger: 110 },
  { selector: '.downloads > div', animation: 'reveal-scale-up', stagger: 120 },
  { selector: '.look-footer > div', animation: 'reveal-fade', stagger: 70 },
];

const revealElements = new Set(document.querySelectorAll('.reveal'));

revealConfigurations.forEach(({ selector, animation, stagger = 0, delay = 0 }) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add('reveal-on-scroll', animation);
    element.style.setProperty('--reveal-delay', `${delay + (index * stagger)}ms`);
    revealElements.add(element);
  });
});

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -52px 0px' });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

document.querySelectorAll('video[data-audio-default]').forEach((video) => {
  video.muted = false;
  video.defaultMuted = false;
  video.volume = 1;
});

const benchmarkCharts = document.querySelectorAll('[data-benchmark-chart]');

if (!reduceMotion && 'IntersectionObserver' in window) {
  const benchmarkObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-chart-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.22, rootMargin: '0px 0px -35px 0px' });
  benchmarkCharts.forEach((chart) => benchmarkObserver.observe(chart));
} else {
  benchmarkCharts.forEach((chart) => chart.classList.add('is-chart-visible'));
}

const methodologyDialog = document.querySelector('.methodology-dialog');

if (methodologyDialog) {
  const closeMethodology = () => {
    methodologyDialog.classList.remove('is-open');
    window.setTimeout(() => methodologyDialog.close(), 180);
  };

  document.querySelector('[data-open-methodology]')?.addEventListener('click', () => {
    methodologyDialog.showModal();
    window.requestAnimationFrame(() => methodologyDialog.classList.add('is-open'));
  });
  document.querySelector('[data-close-methodology]')?.addEventListener('click', closeMethodology);
  methodologyDialog.addEventListener('click', (event) => {
    if (event.target === methodologyDialog) closeMethodology();
  });
  methodologyDialog.addEventListener('close', () => methodologyDialog.classList.remove('is-open'));
}

const lookPrimaryDownload = document.getElementById('lookPrimaryDownload');

if (lookPrimaryDownload) {
  const lookAction = document.getElementById('lookDownloadAction');
  const lookVersion = document.getElementById('lookDownloadVersion');
  const lookFormat = document.getElementById('lookDownloadFormat');
  const lookReleaseLink = document.getElementById('lookReleaseLink');
  const lookChecksumLink = document.getElementById('lookChecksumLink');
  const releaseFallback = 'https://github.com/Phnem/VetroLook/releases';
  const formatSize = (bytes) => {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / (1024 ** index)).toFixed(index > 1 ? 1 : 0)} ${units[index]}`;
  };

  fetch('https://api.github.com/repos/Phnem/VetroLook/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => {
      if (!response.ok) throw new Error('GitHub release request failed');
      return response.json();
    })
    .then((release) => {
      const releaseUrl = release.html_url || releaseFallback;
      const assets = release.assets || [];
      const msi = assets.find((asset) => /\.msi$/i.test(asset.name));
      lookReleaseLink.href = releaseUrl;
      lookChecksumLink.href = releaseUrl;
      lookVersion.textContent = `Latest: ${release.tag_name || 'release'}`;

      if (!msi) {
        lookAction.textContent = 'MSI coming soon';
        lookPrimaryDownload.href = '#download-status';
        lookPrimaryDownload.removeAttribute('target');
        lookPrimaryDownload.setAttribute('aria-disabled', 'true');
        lookPrimaryDownload.classList.add('is-unavailable');
        lookFormat.textContent = 'MSI release is being prepared';
        return;
      }

      lookAction.textContent = 'Download MSI';
      lookPrimaryDownload.href = msi.browser_download_url;
      lookPrimaryDownload.removeAttribute('target');
      lookPrimaryDownload.setAttribute('download', '');
      lookPrimaryDownload.removeAttribute('aria-disabled');
      lookPrimaryDownload.classList.remove('is-unavailable');
      lookFormat.textContent = `MSI · ${formatSize(msi.size)}`;
    })
    .catch(() => {
      lookAction.textContent = 'MSI coming soon';
      lookVersion.textContent = 'Latest release on GitHub';
      lookPrimaryDownload.href = '#download-status';
      lookPrimaryDownload.removeAttribute('target');
      lookPrimaryDownload.setAttribute('aria-disabled', 'true');
      lookPrimaryDownload.classList.add('is-unavailable');
      lookFormat.textContent = 'MSI will download automatically when available';
    });
}
