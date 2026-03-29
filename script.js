document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MENU MOBILE (HAMBURGER)
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 2. EFFET DE LA NAVBAR AU SCROLL
  // ==========================================
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 3. APPARITION DYNAMIQUE (REVEAL)
  // ==========================================
  const sections = document.querySelectorAll('.section');
  const appearOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, appearOptions);

  sections.forEach((sec) => {
    sec.classList.add('section-hidden'); 
    appearOnScroll.observe(sec);
  });

  // ==========================================
  // 4. SCROLL SPY (ILLUMINATION DES LIENS)
  // ==========================================
  const spySections = document.querySelectorAll('header, section'); 
  const spyOptions = { root: null, rootMargin: '-20% 0px -70% 0px' };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => link.classList.remove('active'));
        if (currentId) {
          const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
          if (activeLink && !activeLink.classList.contains('js-open-menu')) {
            activeLink.classList.add('active');
          }
        }
      }
    });
  }, spyOptions);

  spySections.forEach((section) => sectionObserver.observe(section));

  // ==========================================
  // 5. CAROUSEL DES TÉMOIGNAGES (1 par 1)
  // ==========================================
  const track = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = track.querySelectorAll('.testimonial-card');

    const updateCarousel = () => {
      if (cards.length === 0) return;
      const moveAmount = track.parentElement.offsetWidth; 
      track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
    };

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = cards.length - 1;
      }
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
  }

  // ==========================================
  // 6. GESTION DU NOUVEAU POPUP MENU (MODAL)
  // ==========================================
  const menuPopup = document.getElementById('menuPopup');
  const openMenuBtns = document.querySelectorAll('.js-open-menu');
  const closeMenuBtns = document.querySelectorAll('.js-close-menu');

  if (menuPopup) {
    // Ouvrir le modal
    openMenuBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); 
        menuPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche de scroller la page derrière
        
        // Ferme le menu mobile (hamburger) s'il était ouvert
        if(hamburger && hamburger.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });

    // Fermer le modal (via X ou le fond grisé)
    closeMenuBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        menuPopup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Réactive le scroll de la page
      });
    });
  }

});