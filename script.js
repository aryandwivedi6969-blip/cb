/* =============================================
   COTTON BOMBS — JavaScript
   Interactivity, Animations & Effects
   ============================================= */

(function () {
  'use strict';

  // ---- Page Loader ----
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('loaded');
      animateHero();
    }, 2200);
  });

  // ---- Custom Cursor ----
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Hover effect on interactive elements
  const hoverElements = document.querySelectorAll('[data-cursor-hover]');
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover');
      cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover');
      cursorRing.classList.remove('hover');
    });
  });

  // ---- Navbar ----
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---- Hero Animations ----
  function animateHero() {
    const heroLines = document.querySelectorAll('.hero-title .line span');
    const tagline = document.querySelector('.hero-tagline');
    const btn = document.querySelector('.hero .btn-primary');

    heroLines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
      }, i * 200);
    });

    setTimeout(() => tagline.classList.add('visible'), 500);
    setTimeout(() => btn.classList.add('visible'), 800);
  }

  // ---- Smoke Particles ----
  const smokeContainer = document.getElementById('smokeContainer');
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';
    const size = Math.random() * 120 + 40;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = (Math.random() * 6) + 's';
    particle.style.opacity = 0;
    smokeContainer.appendChild(particle);
  }

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---- Button Ripple Effect ----
  document.querySelectorAll('.btn-primary, .btn-outline, .menu-add-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // ---- Parallax Scrolling ----
  const parallaxSections = document.querySelectorAll('[data-parallax]');

  function handleParallax() {
    parallaxSections.forEach((section) => {
      const bg = section.querySelector('.parallax-bg');
      if (!bg) return;
      const rect = section.getBoundingClientRect();
      const speed = 0.3;
      const yPos = rect.top * speed;
      bg.style.transform = `translateY(${yPos}px)`;
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ---- Counter Animation for Stats ----
  const statItems = document.querySelectorAll('.stat-item h4');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.5 }
  );

  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) {
    statsObserver.observe(aboutStats);
  }

  function animateCounters() {
    statItems.forEach((stat) => {
      const text = stat.textContent.trim();
      let target, suffix;

      if (text.includes('K')) {
        target = parseFloat(text) * 1000;
        suffix = 'K';
      } else if (text.includes('+')) {
        target = parseInt(text);
        suffix = '+';
      } else if (text.includes('.')) {
        target = parseFloat(text);
        suffix = '';
      } else {
        target = parseInt(text);
        suffix = '';
      }

      let current = 0;
      const increment = target / 60;
      const isDecimal = text.includes('.');

      function updateCounter() {
        current += increment;
        if (current >= target) {
          stat.textContent = text; // restore original text
          return;
        }

        if (suffix === 'K') {
          stat.textContent = (current / 1000).toFixed(0) + 'K';
        } else if (isDecimal) {
          stat.textContent = current.toFixed(1);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }

        requestAnimationFrame(updateCounter);
      }

      updateCounter();
    });
  }

  // ---- Navbar Active Link Highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkItems.forEach((link) => {
            link.style.opacity = link.getAttribute('href') === '#' + id ? '1' : '0.5';
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-100px 0px -40% 0px' }
  );

  sections.forEach((s) => activeObserver.observe(s));

  // Reset opacity on initial load
  navLinkItems.forEach((link) => (link.style.opacity = '0.5'));

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Gallery Lightbox (minimal) ----
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.95);
        z-index:100000; display:flex; align-items:center; justify-content:center;
        cursor:zoom-out; opacity:0; transition:opacity 0.3s ease;
      `;

      const lbImg = document.createElement('img');
      lbImg.src = img.src;
      lbImg.style.cssText = `
        max-width:90vw; max-height:90vh; object-fit:contain;
        transform:scale(0.9); transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
      `;

      lightbox.appendChild(lbImg);
      document.body.appendChild(lightbox);

      requestAnimationFrame(() => {
        lightbox.style.opacity = '1';
        lbImg.style.transform = 'scale(1)';
      });

      lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        lbImg.style.transform = 'scale(0.9)';
        setTimeout(() => lightbox.remove(), 300);
      });
    });
  });

  // ---- Menu Card Tilt Effect ----
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

})();
