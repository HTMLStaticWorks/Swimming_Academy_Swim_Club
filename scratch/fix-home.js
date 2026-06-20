const fs = require('fs');
let html = fs.readFileSync('home-2.html', 'utf8');
const targetRegex = /<button id="theme-toggle" class="toggle-btn" aria-label="Toggle Theme">\s*<section class="py-6 bg-light-gray">/;
const replacement = `<button id="theme-toggle" class="toggle-btn" aria-label="Toggle Theme">
            <i class="bi bi-moon-fill"></i>
          </button>
          <button id="rtl-toggle" class="toggle-btn" aria-label="Toggle Layout Direction">
            <span>RTL</span>
          </button>
          
          <a href="login.html" class="btn btn-custom-secondary px-3 py-2">Login</a>
          <a href="portal.html" class="btn btn-custom-primary px-3 py-2">Portal</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Centered Classic Hero Section -->
  <section class="py-6 hero-section-classic text-center d-flex align-items-center position-relative" style="background: linear-gradient(rgba(240, 244, 248, 0.6), rgba(240, 244, 248, 0.7)), url('https://images.unsplash.com/photo-1519315901367-f34f815b6719?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat; min-height: 80vh;">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <span class="badge bg-info text-dark px-3 py-2 rounded-pill mb-3 text-uppercase fw-bold tracking-wider">Premium Swim School</span>
          <h1 class="display-3 font-serif mb-3 hero-text-shadow">Dive Into Excellence</h1>
          <p class="lead mb-5 hero-text-shadow">Providing top-tier facilities, internationally certified lifesavers, and structured levels to build lifelong aquatic safety and racing skills.</p>
          <div class="d-flex justify-content-center gap-3">
            <a href="booking.html" class="btn btn-custom-primary px-4 py-3">Book Free Trial</a>
            <a href="about.html" class="btn btn-custom-secondary px-4 py-3">Explore Facilities</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Grid of Highlight Features -->
  <section class="py-6 bg-light-gray">`;
if (targetRegex.test(html)) {
  html = html.replace(targetRegex, replacement);
  fs.writeFileSync('home-2.html', html, 'utf8');
  console.log('Fixed with regex');
} else {
  console.log('regex target not found');
}
