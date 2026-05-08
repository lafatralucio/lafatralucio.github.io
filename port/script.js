// Initialisation de AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

// ========== ANIMATION DES CHIFFRES (COUNT-UP) ==========
const countUpElements = document.querySelectorAll('.count-up');

const animateNumbers = () => {
  countUpElements.forEach(element => {
    const target = parseInt(element.getAttribute('data-target'));
    const numberElement = element.querySelector('.stat-number');
    let current = 0;
    const increment = target / 50;
    const updateNumber = () => {
      current += increment;
      if (current < target) {
        if (target >= 1000) {
          numberElement.textContent = '+' + Math.round(current).toLocaleString();
        } else {
          numberElement.textContent = '+' + Math.round(current);
        }
        requestAnimationFrame(updateNumber);
      } else {
        if (target >= 1000) {
          numberElement.textContent = '+' + target.toLocaleString();
        } else {
          numberElement.textContent = '+' + target;
        }
        // Ajouter 'ans' pour le premier élément
        if (element.querySelector('.stat-label')?.textContent === 'experience') {
          numberElement.textContent = '+' + target + ' ans';
        }
      }
    };
    updateNumber();
  });
};

// Observer pour déclencher l'animation des chiffres quand la section devient visible
const statsSection = document.querySelector('.experience-stats');
let animationTriggered = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationTriggered) {
      animationTriggered = true;
      animateNumbers();
    }
  });
}, { threshold: 0.3 });

if (statsSection) {
  observer.observe(statsSection);
}

// ========== ANIMATION DE TEXTE TAPANT POUR LE NOM ==========
const typingName = document.querySelector('.typing-text');
if (typingName) {
  const originalText = typingName.textContent;
  typingName.textContent = '';
  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      typingName.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  // Démarrer l'animation au chargement
  setTimeout(typeWriter, 500);
}

// ========== ANIMATION D'APPARITION DES CARTES PROJETS AU SCROLL ==========
const projectCards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  cardObserver.observe(card);
});

// ========== ANIMATION DES ÉLÉMENTS DE COMPÉTENCES ==========
const skillItems = document.querySelectorAll('.skills-list li');
skillItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillObserver.observe(item);
});

// ========== EFFET DE SURVOL POUR LES STATISTIQUES ==========
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(stat => {
  stat.addEventListener('mouseenter', () => {
    const number = stat.querySelector('.stat-number');
    if (number) {
      number.style.transform = 'scale(1.1)';
      number.style.transition = 'transform 0.3s ease';
    }
  });
  stat.addEventListener('mouseleave', () => {
    const number = stat.querySelector('.stat-number');
    if (number) {
      number.style.transform = 'scale(1)';
    }
  });
});

// ========== ANIMATION DE L'IMAGE FLOTTANTE ==========
const floatingImage = document.querySelector('.floating-image');
if (floatingImage) {
  floatingImage.style.animation = 'float 4s ease-in-out infinite';
}

// ========== INTERACTIONS DES BOUTONS ==========
document.querySelectorAll('.fullscreen-icon, .fullscreen-badge').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    // Effet d'impulsion au clic
    el.style.transform = 'scale(0.95)';
    setTimeout(() => {
      el.style.transform = '';
    }, 200);
    alert('🔍 Mode Fullscreen — Démo portfolio');
  });
});

document.querySelectorAll('.product-link').forEach(link => {
  link.addEventListener('click', () => {
    link.style.transform = 'translateX(5px)';
    setTimeout(() => {
      link.style.transform = '';
    }, 200);
    alert('📁 Projet démo — Détails disponibles sur GitHub');
  });
});

const viewAll = document.querySelector('.view-all');
if (viewAll) {
  viewAll.addEventListener('click', () => {
    viewAll.style.transform = 'translateX(5px)';
    setTimeout(() => {
      viewAll.style.transform = '';
    }, 200);
    alert('Tous les projets seront bientôt affichés');
  });
}

const setDefault = document.querySelector('.set-default');
if (setDefault) {
  setDefault.addEventListener('click', () => {
    setDefault.style.transform = 'scale(0.95)';
    setTimeout(() => {
      setDefault.style.transform = '';
    }, 200);
    alert('Cette action est une simulation (démo portfolio)');
  });
}

// ========== SMOOTH SCROLL AVEC EFFET ==========
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Animation du clic sur le lien
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
});

// ========== ANIMATION DE CHARGEMENT PARTICULE ==========
console.log("Portfolio animé avec JavaScript — animations: images flottantes, texte tapant, compteurs, apparition au scroll");