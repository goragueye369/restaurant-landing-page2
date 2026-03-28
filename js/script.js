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
  // 2. EFFET DE LA NAVBAR AU SCROLL (FOND SOMBRE)
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
  // 3. APPARITION DYNAMIQUE DES SECTIONS (REVEAL)
  // ==========================================
  const sections = document.querySelectorAll('.section');
  
  const appearOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

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
  // 4. ILLUMINATION DES LIENS AU SCROLL (SCROLL SPY)
  // ==========================================
  const spySections = document.querySelectorAll('header, section'); 
  
  const spyOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', 
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        
        navLinks.forEach((link) => {
          link.classList.remove('active');
        });

        if (currentId) {
          const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }
    });
  }, spyOptions);

  spySections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // ==========================================
  // 5. MENU POPUP
  // ==========================================
  const menuPopup = document.getElementById('menuPopup');
  const menuButton = document.querySelector('[onclick="openMenuPopup(event)"]');

  // Fonction pour ouvrir le popup menu
  window.openMenuPopup = function(event) {
    event.preventDefault();
    if (menuPopup) {
      menuPopup.classList.add('active');
      document.body.style.overflow = 'hidden'; // Empêche le scroll du body
    }
  };

  // Fonction pour fermer le popup menu
  window.closeMenuPopup = function() {
    if (menuPopup) {
      menuPopup.classList.remove('active');
      document.body.style.overflow = ''; // Réactive le scroll du body
    }
  };

  // Fermer le popup avec la touche Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuPopup && menuPopup.classList.contains('active')) {
      closeMenuPopup();
    }
  });

  // Fermer le popup au clic sur le backdrop (déjà géré en HTML avec onclick)
  // mais on ajoute une sécurité ici
  if (menuPopup) {
    menuPopup.addEventListener('click', (event) => {
      if (event.target === menuPopup || event.target.classList.contains('menu-backdrop')) {
        closeMenuPopup();
      }
    });
  }

});