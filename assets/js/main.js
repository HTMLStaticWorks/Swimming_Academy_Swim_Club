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
});

// Theme Management (Light / Dark)
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
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

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleUI(isDark);
    });
  }
}

function updateThemeToggleUI(isDark) {
  const icon = document.querySelector('#theme-toggle i');
  const text = document.querySelector('#theme-toggle span');
  
  if (icon) {
    if (isDark) {
      icon.className = 'bi bi-sun-fill';
      if (text) text.textContent = 'Light Mode';
    } else {
      icon.className = 'bi bi-moon-fill';
      if (text) text.textContent = 'Dark Mode';
    }
  }
}

// RTL Layout Management
function initRTL() {
  const rtlToggle = document.getElementById('rtl-toggle');
  const htmlElement = document.documentElement;
  
  const currentRTL = localStorage.getItem('rtl') === 'true';
  setRTLMode(currentRTL);

  if (rtlToggle) {
    rtlToggle.addEventListener('click', function() {
      const isRTL = htmlElement.getAttribute('dir') !== 'rtl';
      setRTLMode(isRTL);
    });
  }
}

function setRTLMode(enable) {
  const htmlElement = document.documentElement;
  const bootstrapLink = document.getElementById('bootstrap-link');
  const rtlToggleText = document.querySelector('#rtl-toggle span');

  if (enable) {
    htmlElement.setAttribute('dir', 'rtl');
    htmlElement.setAttribute('lang', 'ar');
    localStorage.setItem('rtl', 'true');
    if (bootstrapLink) {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
    }
    if (rtlToggleText) rtlToggleText.textContent = 'LTR';
  } else {
    htmlElement.removeAttribute('dir');
    htmlElement.setAttribute('lang', 'en');
    localStorage.setItem('rtl', 'false');
    if (bootstrapLink) {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    }
    if (rtlToggleText) rtlToggleText.textContent = 'RTL';
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
