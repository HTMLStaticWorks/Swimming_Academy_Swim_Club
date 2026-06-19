/*
   Swimming Academy & Swim Club - Main JS
   Manages global interactions, themes, and layouts.
*/

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initRTL();
  initBackToTop();
  initFormValidation();
  initTrialBooking();
  initVideoOverlay();
  initMobileMenuFixes();
});

// Theme Management (Light / Dark)
function initTheme() {
  const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
  const body = document.body;
  
  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeToggleUI(true);
  } else {
    body.classList.remove('dark-mode');
    updateThemeToggleUI(false);
  }

  if (themeToggles.length > 0) {
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleUI(isDark);
      });
    });
  }
}

function updateThemeToggleUI(isDark) {
  const icons = document.querySelectorAll('#theme-toggle i, .theme-toggle i');
  const texts = document.querySelectorAll('#theme-toggle span, .theme-toggle span');
  
  icons.forEach(icon => {
    if (isDark) {
      icon.className = 'bi bi-sun-fill';
    } else {
      icon.className = 'bi bi-moon-fill';
    }
  });
  
  texts.forEach(text => {
    if (isDark) {
      text.textContent = 'Light Mode';
    } else {
      text.textContent = 'Dark Mode';
    }
  });
}

// RTL Layout Management
function initRTL() {
  const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle');
  const htmlElement = document.documentElement;
  
  const currentRTL = localStorage.getItem('rtl') === 'true';
  setRTLMode(currentRTL);

  if (rtlToggles.length > 0) {
    rtlToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const isRTL = htmlElement.getAttribute('dir') !== 'rtl';
        setRTLMode(isRTL);
      });
    });
  }
}

function setRTLMode(enable) {
  const htmlElement = document.documentElement;
  const bootstrapLink = document.getElementById('bootstrap-link');
  const rtlToggleTexts = document.querySelectorAll('#rtl-toggle span, .rtl-toggle span');

  if (enable) {
    htmlElement.setAttribute('dir', 'rtl');
    htmlElement.setAttribute('lang', 'ar');
    localStorage.setItem('rtl', 'true');
    if (bootstrapLink) {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
    }
    rtlToggleTexts.forEach(text => text.textContent = 'LTR');
  } else {
    htmlElement.removeAttribute('dir');
    htmlElement.setAttribute('lang', 'en');
    localStorage.setItem('rtl', 'false');
    if (bootstrapLink) {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    }
    rtlToggleTexts.forEach(text => text.textContent = 'RTL');
  }
}

// Scroll to Top behavior
function initBackToTop() {
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  backBtn.setAttribute('aria-label', 'Scroll to Top');
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });

  backBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Form validations
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}

// Trial Booking Interaction Mock
function initTrialBooking() {
  const bookingForm = document.getElementById('trial-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      if (bookingForm.checkValidity()) {
        e.preventDefault();
        
        // Show success alert/modal
        const container = bookingForm.parentElement;
        container.innerHTML = `
          <div class="alert alert-success text-center py-5 shadow-sm border-0" role="alert">
            <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
            <h3 class="mt-3 font-serif">Trial Booked Successfully!</h3>
            <p class="mt-2 text-muted">We have sent a confirmation email & OTP details to your mobile number. A coordinator will contact you shortly.</p>
            <a href="index.html" class="btn btn-custom-primary mt-3">Back to Home</a>
          </div>
        `;
      }
    });
  }
}

// Video Overlay Interaction
function initVideoOverlay() {
  const video = document.getElementById('advantageVideo');
  const playBtn = document.getElementById('playBtnOverlay');
  
  if (video && playBtn) {
    playBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
    
    video.addEventListener('play', function() {
      playBtn.style.display = 'none';
    });
    
    video.addEventListener('pause', function() {
      playBtn.style.display = 'flex';
    });
  }
}

// Mobile Menu Fixes
function initMobileMenuFixes() {
  const navbarCollapse = document.getElementById('mainNavbar');
  const navbarToggler = document.querySelector('.navbar-toggler');
  
  if (navbarCollapse && navbarToggler) {
    // 1. Add Close Button inside the menu
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    closeBtn.className = 'btn text-dark position-absolute d-xl-none';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.zIndex = '1060';
    closeBtn.setAttribute('aria-label', 'Close Menu');

    // Handle theme toggle for close button text color
    if (document.body.classList.contains('dark-mode')) {
      closeBtn.classList.replace('text-dark', 'text-white');
    }
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        setTimeout(() => {
          if (document.body.classList.contains('dark-mode')) {
            closeBtn.classList.replace('text-dark', 'text-white');
          } else {
            closeBtn.classList.replace('text-white', 'text-dark');
          }
        }, 50);
      });
    });

    navbarCollapse.insertBefore(closeBtn, navbarCollapse.firstChild);

    // Close when clicking the new close button
    closeBtn.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    });

    // 2. Close menu when any link or action is clicked
    const menuLinks = navbarCollapse.querySelectorAll('a, button');
    menuLinks.forEach(link => {
      // Don't close if it's the theme/rtl toggler or the close button itself
      if (link.closest('.toggle-btn') || link === closeBtn) {
        return;
      }
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }
}

