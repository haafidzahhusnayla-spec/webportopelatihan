/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT — HAAFIDZAH_HUSNAYLA (SMK TELKOM LAMPUNG)
 * Role: Web Developer | RPL SMK Telkom Lampung
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. PRELOADER ANIMATION
   * ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderStatus = document.getElementById('preloader-status');

  const statusTexts = [
    'Menyelam ke Laut Dalam Portofolio...',
    'Menghubungkan Modul RPL SMK Telkom...',
    'Memuat Komponen Bioluminescent...',
    'Menyiapkan Antarmuka Pixel-Perfect...'
  ];

  let currentPercent = 0;
  const loadInterval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 8) + 4;
    if (currentPercent >= 100) {
      currentPercent = 100;
      clearInterval(loadInterval);

      if (preloaderPercent) preloaderPercent.textContent = '100%';
      if (preloaderBar) preloaderBar.style.width = '100%';
      if (preloaderStatus) preloaderStatus.textContent = 'Selamat Datang di Portofolio Haafidzah!';

      setTimeout(() => {
        if (preloader) preloader.classList.add('hide');
      }, 400);
    } else {
      if (preloaderPercent) preloaderPercent.textContent = `${currentPercent}%`;
      if (preloaderBar) preloaderBar.style.width = `${currentPercent}%`;

      const statusIndex = Math.min(
        Math.floor((currentPercent / 100) * statusTexts.length),
        statusTexts.length - 1
      );
      if (preloaderStatus) preloaderStatus.textContent = statusTexts[statusIndex];
    }
  }, 35);


  /* ------------------------------------------------------------------------
   * 2. TOP SCROLL PROGRESS BAR & HEADER SCROLL EFFECT
   * ------------------------------------------------------------------------ */
  const progressBar = document.getElementById('scroll-progress-bar');
  const siteHeader = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (siteHeader) {
      if (scrollTop > 50) {
        siteHeader.style.background = 'rgba(3, 9, 18, 0.92)';
        siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
      } else {
        siteHeader.style.background = 'rgba(4, 12, 22, 0.7)';
        siteHeader.style.boxShadow = 'none';
      }
    }
  }, { passive: true });


  /* ------------------------------------------------------------------------
   * 3. TYPEWRITER EFFECT
   * ------------------------------------------------------------------------ */
  const typewriterElement = document.getElementById('typewriter-text');
  const roles = [
    'Web Developer',
    'Siswa RPL SMK Telkom Lampung',
    'Front-End Specialist',
    'UI/UX Enthusiast',
    'Software Engineering Student'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1600; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();


  /* ------------------------------------------------------------------------
   * 4. 3D TILT EFFECT ON HERO PROFILE CARD
   * ------------------------------------------------------------------------ */
  const tiltCardWrapper = document.getElementById('profile-tilt-card');
  const glassCard = tiltCardWrapper?.querySelector('.glass-profile-card');

  if (tiltCardWrapper && glassCard) {
    tiltCardWrapper.addEventListener('mousemove', (e) => {
      const rect = tiltCardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      glassCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    tiltCardWrapper.addEventListener('mouseleave', () => {
      glassCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }


  /* ------------------------------------------------------------------------
   * 5. BUILT-IN LO-FI AMBIENT AUDIO SYNTHESIZER (Web Audio API)
   * Plays mellow ambient chill chords without needing external mp3 files!
   * ------------------------------------------------------------------------ */
  const lofiPlayBtn = document.getElementById('lofi-play-btn');
  const playIconSvg = document.getElementById('play-icon-svg');
  const lofiDisc = document.getElementById('lofi-disc');
  const eqBars = document.getElementById('eq-bars');
  const lofiHint = document.getElementById('lofi-hint');
  const lofiCurrentTime = document.getElementById('lofi-current-time');
  const lofiProgressFill = document.getElementById('lofi-progress-fill');
  const lofiTrackTitle = document.getElementById('lofi-track-title');
  const lofiTrackArtist = document.getElementById('lofi-track-artist');
  const lofiPrevBtn = document.getElementById('lofi-prev-btn');
  const lofiNextBtn = document.getElementById('lofi-next-btn');

  const tracks = [
    { title: 'Deep Sea Chillhop (Acoustic)', artist: 'SMK Telkom Lampung · Coding Flow' },
    { title: 'Bioluminescent Waves (Lo-Fi)', artist: 'Fari Madyan · Midnight Session' },
    { title: 'Lampung Coastal Breeze', artist: 'SMK Telkom RPL · Focus Mode' }
  ];

  let currentTrackIdx = 0;
  let isPlayingAudio = false;
  let audioCtx = null;
  let audioTimer = null;
  let secondsElapsed = 0;
  const trackDuration = 165; // 2:45 in seconds

  // Simple Synthesizer for Lo-Fi Chords
  function playLoFiChord() {
    if (!isPlayingAudio || !audioCtx) return;

    try {
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [146.83, 174.61, 220.00, 261.63], // Dm7
        [196.00, 246.94, 293.66, 349.23]  // G7
      ];

      const chord = chords[Math.floor(Math.random() * chords.length)];
      const now = audioCtx.currentTime;

      chord.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Warm Low-Pass filter to simulate classic Lo-Fi tape warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 3.4);
      });
    } catch (e) {
      // AudioContext fallback
    }

    if (isPlayingAudio) {
      setTimeout(playLoFiChord, 3200);
    }
  }

  function toggleAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlayingAudio = !isPlayingAudio;

    if (isPlayingAudio) {
      // UI Updates
      if (lofiDisc) lofiDisc.classList.add('playing');
      if (eqBars) eqBars.classList.add('playing');
      if (lofiHint) lofiHint.textContent = '⏸ Sedang Berputar';
      if (playIconSvg) {
        playIconSvg.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      }

      playLoFiChord();

      // Progress Tracker
      audioTimer = setInterval(() => {
        secondsElapsed++;
        if (secondsElapsed > trackDuration) secondsElapsed = 0;

        const mins = Math.floor(secondsElapsed / 60);
        const secs = secondsElapsed % 60;
        if (lofiCurrentTime) {
          lofiCurrentTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        if (lofiProgressFill) {
          lofiProgressFill.style.width = `${(secondsElapsed / trackDuration) * 100}%`;
        }
      }, 1000);

      showToast(`🎵 Memutar: ${tracks[currentTrackIdx].title}`);
    } else {
      // Pause
      if (lofiDisc) lofiDisc.classList.remove('playing');
      if (eqBars) eqBars.classList.remove('playing');
      if (lofiHint) lofiHint.textContent = '▶ Klik Putar Suara';
      if (playIconSvg) {
        playIconSvg.innerHTML = '<polygon points="6 4 20 12 6 20 6 4"></polygon>';
      }
      clearInterval(audioTimer);
    }
  }

  if (lofiPlayBtn) {
    lofiPlayBtn.addEventListener('click', toggleAudio);
  }

  function changeTrack(direction) {
    currentTrackIdx = (currentTrackIdx + direction + tracks.length) % tracks.length;
    if (lofiTrackTitle) lofiTrackTitle.textContent = tracks[currentTrackIdx].title;
    if (lofiTrackArtist) lofiTrackArtist.textContent = tracks[currentTrackIdx].artist;
    secondsElapsed = 0;
    if (lofiCurrentTime) lofiCurrentTime.textContent = '0:00';
    if (lofiProgressFill) lofiProgressFill.style.width = '0%';

    showToast(`Track: ${tracks[currentTrackIdx].title}`);
  }

  if (lofiPrevBtn) lofiPrevBtn.addEventListener('click', () => changeTrack(-1));
  if (lofiNextBtn) lofiNextBtn.addEventListener('click', () => changeTrack(1));


  /* ------------------------------------------------------------------------
   * 6. MOBILE NAVIGATION DRAWER
   * ------------------------------------------------------------------------ */
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ------------------------------------------------------------------------
   * 7. SCROLL REVEAL OBSERVER
   * ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ------------------------------------------------------------------------
   * 8. SKILLS CATEGORY FILTER
   * ------------------------------------------------------------------------ */
  const skillTabButtons = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillTabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-skill-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  /* ------------------------------------------------------------------------
   * 9. FAQ ACCORDION
   * ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const toggleBtn = item.querySelector('.faq-toggle-btn');
    toggleBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-toggle-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ------------------------------------------------------------------------
   * 10. PROJECT PREVIEW MODAL TRIGGER
   * ------------------------------------------------------------------------ */
  const previewBtns = document.querySelectorAll('.project-preview-btn');
  previewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-project');
      let title = 'Proyek Unggulan Siswa RPL';
      if (proj === 'portal-rpl') title = 'Portal Akademik & Siswa RPL SMK Telkom Lampung';
      if (proj === 'wisata-lampung') title = 'Eksplor Pariwisata Bahari Lampung';
      if (proj === 'tokokito') title = 'TokoKito — E-Katalog Produk Khas Lampung';

      showToast(`🔍 Membuka detail: ${title}`);
    });
  });


  /* ------------------------------------------------------------------------
   * 11. INTERACTIVE FARIBOT (AI Assistant Modal)
   * ------------------------------------------------------------------------ */
  const botToggleBtn = document.getElementById('bot-toggle-btn');
  const botModal = document.getElementById('bot-modal');
  const botCloseBtn = document.getElementById('bot-close-btn');
  const botMessages = document.getElementById('bot-messages');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (botToggleBtn && botModal) {
    botToggleBtn.addEventListener('click', () => {
      botModal.classList.toggle('open');
    });

    botCloseBtn?.addEventListener('click', () => {
      botModal.classList.remove('open');
    });

    const botAnswers = {
      siapa: 'Muhammad Fari Madyan adalah siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMK Telkom Lampung dengan spesialisasi Front-End Web Development dan desain UI/UX.',
      skills: 'Keahlian Fari meliputi HTML5, CSS3 Modern (Glassmorphism & Tailwind), JavaScript ES6+, PHP dasar, MySQL basis data, Git & GitHub, dan Figma prototyping.',
      magang: 'Ya, Fari sangat siap dan terbuka untuk program Magang / Praktik Kerja Lapangan (PKL) di industri perangkat lunak atau kolaborasi freelance.',
      kontak: 'Anda dapat menghubungi Fari melalui WhatsApp di +62 895-2050-7342, email di farimadyan.dev@gmail.com, atau via GitHub di github.com/haafidzahhusnayla-spec.'
    };

    quickChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const questionKey = chip.getAttribute('data-question');
        const questionText = chip.textContent;
        const answerText = botAnswers[questionKey] || 'Pertanyaan menarik! Silakan hubungi langsung Fari via kontak.';

        // Append User Bubble
        const userMsg = document.createElement('div');
        userMsg.className = 'bot-msg user-bubble';
        userMsg.textContent = questionText;
        botMessages.appendChild(userMsg);

        // Scroll to bottom
        botMessages.scrollTop = botMessages.scrollHeight;

        // Simulate Bot Typing
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'bot-msg bot-bubble';
          botMsg.innerHTML = `<strong>FariBot:</strong> ${answerText}`;
          botMessages.appendChild(botMsg);
          botMessages.scrollTop = botMessages.scrollHeight;
        }, 400);
      });
    });
  }


  /* ------------------------------------------------------------------------
   * 12. DIRECT CONTACT FORM & WHATSAPP REDIRECT
   * ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const subject = document.getElementById('form-subject')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Harap lengkapi semua kolom formulir.');
        return;
      }

      // Generate WhatsApp text message
      const waText = `Halo Muhammad Fari Madyan,\n\nSaya ingin menghubungi Anda terkait *${subject}*:\n\n*Nama:* ${name}\n*Email:* ${email}\n*Pesan:*\n${message}\n\nTerima kasih!`;
      const waUrl = `https://wa.me/6289520507342?text=${encodeURIComponent(waText)}`;

      showToast('🚀 Mengalihkan pesan ke WhatsApp Fari...');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        contactForm.reset();
      }, 1000);
    });
  }


  /* ------------------------------------------------------------------------
   * 13. COPY EMAIL TO CLIPBOARD
   * ------------------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailAddress = document.getElementById('email-address')?.textContent;
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyEmailBtn && emailAddress) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        if (copyBtnText) copyBtnText.textContent = 'Tersalin!';
        showToast('📋 Alamat email disalin ke papan klip!');
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Salin';
        }, 2500);
      }).catch(() => {
        showToast('📋 Email: farimadyan.dev@gmail.com');
      });
    });
  }


  /* ------------------------------------------------------------------------
   * 14. GLOBAL TOAST NOTIFICATION HELPER
   * ------------------------------------------------------------------------ */
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

});
