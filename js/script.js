document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MENU MOBILE (HAMBURGER)
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    // Ouvrir/Fermer le menu au clic sur le hamburger
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fermer le menu automatiquement quand on clique sur un lien
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
    threshold: 0.15 // Déclenche l'animation quand 15% de la section est visible
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Arrête d'observer une fois apparu
      }
    });
  }, appearOptions);

  sections.forEach((sec) => {
    sec.classList.add('section-hidden'); // Cache la section au chargement (nécessite le CSS)
    appearOnScroll.observe(sec);
  });

  // ==========================================
  // 4. ILLUMINATION DES LIENS AU SCROLL (SCROLL SPY)
  // ==========================================
  // On sélectionne le header (Accueil) et toutes les sections
  const spySections = document.querySelectorAll('header, section'); 
  
  // On configure l'observateur pour déclencher le changement quand 
  // la section atteint environ le milieu haut de l'écran
  const spyOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', 
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // On récupère l'ID de la section visible (ex: 'home', 'menu', 'contact')
        const currentId = entry.target.getAttribute('id');
        
        // On retire la classe 'active' de TOUS les liens
        navLinks.forEach((link) => {
          link.classList.remove('active');
        });

        // On cherche le lien qui correspond à l'ID et on lui ajoute 'active'
        if (currentId) {
          const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }
    });
  }, spyOptions);

  // On dit à l'observateur de surveiller chaque section
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

  // ==========================================
  // 6. FORMULAIRE DE RÉSERVATION
  // ==========================================
  
  // Fonction pour gérer la soumission du formulaire de réservation
  window.handleReservation = function(event) {
    event.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = {
      name: document.getElementById('res-name').value,
      phone: document.getElementById('res-phone').value,
      email: document.getElementById('res-email').value,
      date: document.getElementById('res-date').value,
      time: document.getElementById('res-time').value,
      guests: document.getElementById('res-guests').value,
      comments: document.getElementById('res-comments').value
    };
    
    // Validation simple
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time || !formData.guests) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Simuler l'envoi de la réservation
    console.log('Réservation soumise:', formData);
    
    // Afficher un message de confirmation
    const confirmationMessage = `
      Réservation confirmée !
      
      Détails de votre réservation:
      • Nom: ${formData.name}
      • Téléphone: ${formData.phone}
      • Email: ${formData.email}
      • Date: ${formData.date}
      • Heure: ${formData.time}
      • Nombre de personnes: ${formData.guests}
      ${formData.comments ? `• Commentaires: ${formData.comments}` : ''}
      
      Vous recevrez une confirmation par email ou téléphone.
      
      Merci de votre confiance !
    `;
    
    // Afficher une boîte de dialogue stylisée
    if (confirm(confirmationMessage)) {
      // Réinitialiser le formulaire
      document.querySelector('.reservation-form').reset();
      
      // Optionnel: scroller vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Définir la date minimale à aujourd'hui
  document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }
  });

});