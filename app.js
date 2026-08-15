// Staggered Mobile Navigation (React Bits Inspired)
const menuButton = document.getElementById('menuButton') || document.querySelector('.menu-button');
const mobileNav = document.getElementById('mobileNav') || document.querySelector('.mobile-nav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function openMobileMenu() {
  if (!mobileNav) return;
  mobileNavOverlay?.classList.add('is-open');
  mobileNavOverlay?.setAttribute('aria-hidden', 'false');
  mobileNav.classList.add('is-open');
  menuButton?.classList.add('is-open');
  menuButton?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (!mobileNav) return;
  mobileNavOverlay?.classList.remove('is-open');
  mobileNavOverlay?.setAttribute('aria-hidden', 'true');
  mobileNav.classList.remove('is-open');
  menuButton?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function toggleMobileMenu() {
  const isOpen = mobileNav?.classList.contains('is-open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

menuButton?.addEventListener('click', toggleMobileMenu);

// Close menu when clicking backdrop overlay
mobileNavOverlay?.addEventListener('click', (e) => {
  if (e.target === mobileNavOverlay) {
    closeMobileMenu();
  }
});

// Close menu when clicking navigation links
mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav?.classList.contains('is-open')) {
    closeMobileMenu();
  }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Scroll Progress Bar & Dynamic Header
const scrollProgress = document.getElementById('scrollProgress');
const siteHeader = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const trackedSections = document.querySelectorAll('section[id], main[id]');

function updateScrollUI() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  // Progress bar
  if (scrollProgress && docHeight > 0) {
    const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
    scrollProgress.style.width = `${progress}%`;
  }

  // Header background on scroll
  if (siteHeader) {
    siteHeader.classList.toggle('is-scrolled', scrollY > 40);
  }

  // Active section highlighting
  let currentSectionId = '';
  trackedSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 200 && rect.bottom >= 150) {
      currentSectionId = section.id;
    }
  });

  if (currentSectionId) {
    navLinks.forEach(link => {
      const match = link.getAttribute('href') === `#${currentSectionId}`;
      link.classList.toggle('is-active', match);
    });
  }
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

// Scroll Animations & Staggered Reveal
const revealConfigurations = [
  // Collection section
  { selector: '.collection .section-heading-wrap', animClass: 'reveal-from-left' },
  { selector: '.collection-cards .format-card', animClass: 'reveal-scale-up', stagger: 120 },
  { selector: '.collection-caption', animClass: 'reveal-fade', delay: 200 },
  
  // Experience section
  { selector: '.experience-top', animClass: 'reveal-from-left' },
  { selector: '.big-word', animClass: 'reveal-from-left', delay: 100 },
  { selector: '.reader-device', animClass: 'reveal-scale-up', delay: 200 },
  { selector: '.progress-chip', animClass: 'reveal-from-right', stagger: 150 },
  { selector: '.cursor-word', animClass: 'reveal-fade', delay: 350 },
  
  // Features section
  { selector: '.features > .eyebrow', animClass: 'reveal-from-left' },
  { selector: '.feature-list article', animClass: 'reveal-from-left', stagger: 100 },
  
  // Sync section
  { selector: '.sync-copy', animClass: 'reveal-from-left' },
  { selector: '.sync-visual', animClass: 'reveal-scale-up', delay: 100 },
  { selector: '.sync-node', animClass: 'reveal-from-right', stagger: 120 },
  
  // Open source section
  { selector: '.open-source > *', animClass: 'reveal-scale-up', stagger: 80 },
  
  // Download section
  { selector: '.download > .eyebrow', animClass: 'reveal-from-left' },
  { selector: '.download > h2', animClass: 'reveal-scale-up' },
  { selector: '.download > p', animClass: 'reveal-fade', delay: 100 },
  { selector: '.download-options .download-card', animClass: 'reveal-scale-up', stagger: 120 }
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const elementsToObserve = [];

revealConfigurations.forEach(({ selector, animClass, stagger, delay }) => {
  const nodes = document.querySelectorAll(selector);
  nodes.forEach((node, index) => {
    node.classList.add('reveal-on-scroll');
    if (animClass) node.classList.add(animClass);

    let elementDelay = 0;
    if (delay) elementDelay += delay;
    if (stagger) elementDelay += index * stagger;

    if (elementDelay > 0) {
      node.style.setProperty('--reveal-delay', `${elementDelay}ms`);
    }

    elementsToObserve.push(node);
  });
});

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elementsToObserve.forEach(element => revealObserver.observe(element));
} else {
  elementsToObserve.forEach(element => element.classList.add('is-visible'));
}

// Subtle Scroll Parallax (Disabled on reduced motion)
if (!prefersReducedMotion && window.innerWidth > 680) {
  const phoneMain = document.querySelector('.phone-main');
  const phoneBack = document.querySelector('.phone-back');
  const orbViolet = document.querySelector('.orb-violet');
  const orbLime = document.querySelector('.orb-lime');
  const heroStage = document.querySelector('.hero-stage');
  const syncVisual = document.querySelector('.sync-visual');
  const syncRingOne = document.querySelector('.ring-one');
  const syncRingTwo = document.querySelector('.ring-two');
  const readerDevice = document.querySelector('.reader-device');

  let ticking = false;

  function onParallaxScroll() {
    const scrollY = window.scrollY;
    const heroHeight = heroStage ? heroStage.offsetHeight : 800;

    // Hero parallax when within or near hero
    if (scrollY < heroHeight * 1.5) {
      const heroFactor = scrollY * 0.08;
      if (phoneMain) {
        phoneMain.style.transform = `rotate(-7deg) translateY(${heroFactor * 0.5}px)`;
      }
      if (phoneBack) {
        phoneBack.style.transform = `rotate(12deg) translateY(${-heroFactor * 0.7}px)`;
      }
      if (orbViolet) {
        orbViolet.style.transform = `translateY(${heroFactor * 0.9}px) scale(${1 + scrollY * 0.0003})`;
      }
      if (orbLime) {
        orbLime.style.transform = `translateY(${-heroFactor * 0.6}px)`;
      }
    }

    // Sync rings continuous subtle rotation on scroll
    if (syncVisual) {
      const syncRect = syncVisual.getBoundingClientRect();
      if (syncRect.top < window.innerHeight && syncRect.bottom > 0) {
        const syncProgress = (window.innerHeight - syncRect.top) * 0.05;
        if (syncRingOne) {
          syncRingOne.style.transform = `translate(-50%, -50%) rotate(${syncProgress}deg)`;
        }
        if (syncRingTwo) {
          syncRingTwo.style.transform = `translate(-50%, -50%) rotate(${-syncProgress * 1.5}deg)`;
        }
      }
    }

    // Reader device tilt effect on scroll
    if (readerDevice) {
      const readerRect = readerDevice.getBoundingClientRect();
      if (readerRect.top < window.innerHeight && readerRect.bottom > 0) {
        const readerProgress = (window.innerHeight - readerRect.top) * 0.02;
        readerDevice.style.transform = `rotate(${-4 + readerProgress * 0.2}deg) translateY(${-readerProgress}px)`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onParallaxScroll);
      ticking = true;
    }
  }, { passive: true });
}

// GitHub Releases API - Latest Release Direct APK Downloader
const GITHUB_API_LATEST_RELEASE = 'https://api.github.com/repos/Phnem/Vetro/releases/latest';
const FALLBACK_DOWNLOAD_URL = 'https://github.com/Phnem/Vetro/releases/latest';

const directApkBtn = document.getElementById('directApkDownload');
const apkVersionLabel = document.getElementById('apkVersionLabel');
const apkActionLabel = document.getElementById('apkActionLabel');
const downloadEyebrow = document.getElementById('downloadEyebrow');

let latestApkUrl = null;
let releaseFetchPromise = null;

async function fetchLatestRelease() {
  try {
    const response = await fetch(GITHUB_API_LATEST_RELEASE);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    
    const apkAsset = Array.isArray(data.assets) 
      ? data.assets.find(asset => asset.name && asset.name.toLowerCase().endsWith('.apk')) || data.assets[0]
      : null;

    if (apkAsset && apkAsset.browser_download_url) {
      latestApkUrl = apkAsset.browser_download_url;
      if (directApkBtn) {
        directApkBtn.href = latestApkUrl;
        directApkBtn.setAttribute('download', apkAsset.name || 'vetro.apk');
      }
    }

    const tagName = data.tag_name || data.name;
    if (tagName) {
      if (apkVersionLabel) {
        apkVersionLabel.textContent = `Direct APK · ${tagName}`;
      }
      if (downloadEyebrow) {
        downloadEyebrow.textContent = `ANDROID / VERSION ${tagName.replace(/^v/i, '')}`;
      }
    }

    if (apkAsset && apkAsset.size && apkActionLabel) {
      const sizeMB = (apkAsset.size / (1024 * 1024)).toFixed(1);
      apkActionLabel.textContent = `Download APK (${sizeMB} MB)`;
    }

    return latestApkUrl || FALLBACK_DOWNLOAD_URL;
  } catch (err) {
    console.warn('Could not fetch latest release info from GitHub API:', err);
    return FALLBACK_DOWNLOAD_URL;
  }
}

// Prefetch latest release on load
releaseFetchPromise = fetchLatestRelease();

// Handle direct download click
directApkBtn?.addEventListener('click', async (event) => {
  if (latestApkUrl) {
    // APK URL is already available, normal anchor download proceeds
    return;
  }

  event.preventDefault();
  directApkBtn.classList.add('is-loading');
  if (apkActionLabel) apkActionLabel.textContent = 'Fetching APK...';

  try {
    const targetUrl = await (releaseFetchPromise || fetchLatestRelease());
    directApkBtn.href = targetUrl;
    window.location.href = targetUrl;
  } catch (e) {
    window.open(FALLBACK_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
  } finally {
    directApkBtn.classList.remove('is-loading');
    if (apkActionLabel && !apkActionLabel.textContent.includes('MB')) {
      apkActionLabel.textContent = 'Download APK';
    }
  }
});

// Privacy Policy Modal Logic
const privacyModal = document.getElementById('privacyModal');
const openPrivacyBtn = document.getElementById('openPrivacyBtn');
const mobilePrivacyBtn = document.getElementById('mobilePrivacyBtn');
const closePrivacyModal = document.getElementById('closePrivacyModal');

function openPrivacy() {
  if (!privacyModal) return;
  privacyModal.classList.add('is-open');
  privacyModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePrivacy() {
  if (!privacyModal) return;
  privacyModal.classList.remove('is-open');
  privacyModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openPrivacyBtn?.addEventListener('click', openPrivacy);
mobilePrivacyBtn?.addEventListener('click', () => {
  closeMobileMenu();
  openPrivacy();
});

closePrivacyModal?.addEventListener('click', closePrivacy);

privacyModal?.addEventListener('click', (e) => {
  if (e.target === privacyModal) {
    closePrivacy();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && privacyModal?.classList.contains('is-open')) {
    closePrivacy();
  }
});

// Page Preloader Dismissal (fresh-lizard-20)
const pagePreloader = document.getElementById('pagePreloader');
const preloaderStartTime = Date.now();
const MIN_PRELOADER_TIME = 900; // ms to display animated keywords smoothly

function dismissPreloader() {
  if (!pagePreloader || pagePreloader.classList.contains('is-loaded')) return;
  const elapsed = Date.now() - preloaderStartTime;
  const remaining = Math.max(0, MIN_PRELOADER_TIME - elapsed);
  
  setTimeout(() => {
    pagePreloader.classList.add('is-loaded');
    pagePreloader.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      pagePreloader.remove();
    }, 700);
  }, remaining);
}

if (document.readyState === 'complete') {
  dismissPreloader();
} else {
  window.addEventListener('load', dismissPreloader);
  // Fallback safety timer in case of slow resources
  setTimeout(dismissPreloader, 2800);
}
