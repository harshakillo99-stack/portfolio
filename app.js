/**
 * Killo Harsha - Portfolio Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CANVAS PARTICLE SYSTEM
  // ==========================================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.5 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.45)';
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const opacity = 1 - distance / 110;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================
  // 2. HERO TYPING ANIMATION
  // ==========================================
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const words = [
      'Full Stack Web Applications',
      'Scalable REST & GraphQL APIs',
      'High-Performance Frontends',
      'Modern Node & Express Backends',
      'Real-Time WebSocket Architectures'
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        typedTarget.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        typedTarget.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        typingSpeed = 1600; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typingSpeed = 300; // Pause before typing next word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // ==========================================
  // 3. STATS NUMBER COUNTER
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  function countStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      let count = 0;
      const step = Math.max(1, Math.floor(target / 30));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(interval);
        } else {
          stat.textContent = count;
        }
      }, 35);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        countStats();
        statsCounted = true;
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stat-number');
  if (statsSection) {
    observer.observe(statsSection.closest('section'));
  }

  // ==========================================
  // 4. NAVBAR ACTIVE LINK & SCROLL SPY
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky shadow
    if (scrollY > 40) {
      navbar.classList.add('shadow-xl', 'bg-darkBg/95');
    } else {
      navbar.classList.remove('shadow-xl', 'bg-darkBg/95');
    }

    // Scroll spy
    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute('id');

      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ==========================================
  // 5. MOBILE MENU TOGGLE
  // ==========================================
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      });
    });
  }

  // ==========================================
  // 6. PROJECTS FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active-filter');
      btn.classList.remove('text-slate-400');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 7. PROJECT DETAILS MODAL DATA
  // ==========================================
  const projectData = {
    devpulse: {
      title: 'DevPulse - Real-Time Team Collaboration SaaS',
      tag: 'Full Stack / WebSocket / Next.js',
      description: 'DevPulse is a collaborative developer workspace engineered for high-velocity teams. It combines markdown documentation, rich-text canvas, real-time shared code editors, and live team presence.',
      features: [
        'Real-time multi-user document synchronization with operational transformation via WebSockets.',
        'Granular Role-Based Access Control (Admin, Member, Viewer).',
        'Built-in video and voice channels with WebRTC signaling.',
        'Dark mode first, fully responsive UI built with Tailwind CSS.'
      ],
      stack: ['Next.js 14', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Tailwind CSS', 'Docker']
    },
    cloudcommerce: {
      title: 'CloudCommerce - Scalable Microservices Marketplace',
      tag: 'Full Stack / Microservices / Stripe',
      description: 'A modular, high-performance e-commerce architecture designed to handle peak transaction loads with sub-100ms response times and zero cart state loss.',
      features: [
        'Integrated Stripe payment intents and webhooks for atomic order confirmation.',
        'Redis distributed locking to prevent race conditions during rapid flash sales.',
        'PostgreSQL database with indexed queries and Prisma ORM for type safety.',
        'Automated PDF invoice generation and transactional email notifications.'
      ],
      stack: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Stripe API', 'Tailwind CSS']
    },
    apextask: {
      title: 'ApexTask - Agile Project Management Dashboard',
      tag: 'Frontend / Interactive UI / State Management',
      description: 'A responsive Kanban dashboard offering fluid drag-and-drop workflows, task prioritization, sprint health analytics, and milestone timeline tracking.',
      features: [
        'Fluid drag-and-drop interaction supporting reordering across custom workflow columns.',
        'State management powered by Zustand with persistent local & cloud sync.',
        'Sprint velocity and burndown charts built with Chart.js.',
        'Keyboard shortcuts for ultra-fast task creation and status changes.'
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Chart.js']
    },
    streamsync: {
      title: 'StreamSync API - High-Throughput Media Streaming Service',
      tag: 'Backend & APIs / Node.js / AWS S3',
      description: 'A resilient backend streaming engine that processes large audio and video uploads via chunked transfers and serves adaptive bitrate streams.',
      features: [
        'Resumable chunked file upload pipeline handling files up to 5GB.',
        'Background transcoding service with FFmpeg generating HLS/DASH streams.',
        'AWS S3 Presigned URLs for secure direct-to-cloud transfers.',
        'Strict rate limiting and JWT-based API key tier authorization.'
      ],
      stack: ['Node.js', 'Express', 'AWS S3', 'FFmpeg', 'Docker', 'Redis', 'Jest']
    },
    neurochat: {
      title: 'NeuroChat AI - Conversational AI Interface & Code Runner',
      tag: 'Frontend / AI UI / SSE Streaming',
      description: 'A sleek web application interface designed for AI interactions with real-time text token streaming, multi-turn conversation memory, and live code sandbox execution.',
      features: [
        'Smooth Server-Sent Events (SSE) streaming for character-by-character responses.',
        'Interactive code snippets with instant syntax highlighting and one-click copy.',
        'Branching conversation tree allowing edits to previous user queries.',
        'Mobile-optimized responsive sidebar and conversation history search.'
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'PrismJS', 'Vite', 'Lucide Icons']
    },
    authguardian: {
      title: 'AuthGuardian - Standalone Identity & Access Management Service',
      tag: 'Backend / Security / OAuth 2.0',
      description: 'A hardened authentication microservice providing token rotation, Two-Factor Authentication (TOTP), session invalidation, and OAuth 2.0 integrations.',
      features: [
        'Short-lived JWT access tokens paired with cryptographically secure refresh token rotation.',
        'Time-based One-Time Password (TOTP) support compatible with Google Authenticator.',
        'Rate-limiting brute force protection backed by sliding-window Redis counters.',
        'Compliance with OWASP security guidelines and password hashing using Argon2.'
      ],
      stack: ['Node.js', 'PostgreSQL', 'Redis', 'Argon2', 'JWT', 'Docker']
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('modal-project-title');
  const projectModalContent = document.getElementById('modal-project-content');
  const projectModalTag = document.getElementById('modal-project-tag');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  window.openProjectModal = function(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    projectModalTitle.textContent = data.title;
    projectModalTag.textContent = data.tag;

    let featuresHtml = data.features.map(f => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-brand-400 mt-1 text-xs"></i><span>${f}</span></li>`).join('');
    let stackHtml = data.stack.map(s => `<span class="px-2.5 py-1 rounded bg-slate-800 text-brand-300 font-mono text-xs border border-slate-700/60">${s}</span>`).join('');

    projectModalContent.innerHTML = `
      <p class="text-slate-300 text-sm leading-relaxed">${data.description}</p>
      <div>
        <h5 class="text-xs font-mono text-brand-400 uppercase tracking-wider mb-2">Key Engineering Features</h5>
        <ul class="space-y-2 text-xs text-slate-300">${featuresHtml}</ul>
      </div>
      <div>
        <h5 class="text-xs font-mono text-brand-400 uppercase tracking-wider mb-2">Tech Stack Architecture</h5>
        <div class="flex flex-wrap gap-2">${stackHtml}</div>
      </div>
    `;

    projectModal.classList.remove('hidden');
  };

  function closeProjectModal() {
    if (projectModal) projectModal.classList.add('hidden');
  }

  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // ==========================================
  // 8. RESUME MODAL HANDLERS
  // ==========================================
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('resume-btn');
  const quickResumeBtn = document.getElementById('quick-resume-btn');
  const viewResumeCardBtn = document.getElementById('view-resume-card-btn');
  const closeResumeModalBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) resumeModal.classList.remove('hidden');
  }

  function closeResume() {
    if (resumeModal) resumeModal.classList.add('hidden');
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (quickResumeBtn) quickResumeBtn.addEventListener('click', openResume);
  if (viewResumeCardBtn) viewResumeCardBtn.addEventListener('click', openResume);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ESC key to close all modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResume();
    }
  });

  // ==========================================
  // 9. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 4000);
  }

  // ==========================================
  // 10. COPY EMAIL TO CLIPBOARD
  // ==========================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast(`Contact email: ${email}`);
      });
    });
  }

  // ==========================================
  // 11. CONTACT FORM HANDLING
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || 'General Inquiry';
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Visual feedback on button
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Sending message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        showToast('Thank you! Your message has been sent successfully.');

        if (formStatus) {
          formStatus.className = 'p-4 rounded-xl text-center text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 block';
          formStatus.innerHTML = `✓ Thank you, ${name}! Your inquiry has been received. Harsha will respond to ${email} shortly.`;
          setTimeout(() => {
            formStatus.className = 'hidden';
          }, 6000);
        }
      }, 900);
    });
  }

});
