/*
   Swimming Academy & Swim Club - Dashboard JS
   Manages dashboard tab transitions, mock database operations, payments, and charts.
*/

document.addEventListener('DOMContentLoaded', function() {
  initDashboardNavigation();
  initMockAttendance();
  initMockProgressUpdates();
  initPaymentSimulation();
  initDashboardCharts();
});

// Sidebar dynamic section navigation
function initDashboardNavigation() {
  const links = document.querySelectorAll('.sidebar-nav .nav-link[data-section]');
  const sections = document.querySelectorAll('.dashboard-section');
  
  if (links.length > 0) {
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        links.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide all sections
        sections.forEach(s => s.classList.add('d-none'));
        
        // Show target section
        const targetId = this.getAttribute('data-section');
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
          targetSec.classList.remove('d-none');
        }
        
        // Scroll to the top of the page when changing tabs
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Auto-close offcanvas mobile menu if it is open
        const offcanvasEl = this.closest('.sidebar-nav');
        if (offcanvasEl && offcanvasEl.classList.contains('show') && typeof bootstrap !== 'undefined') {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (bsOffcanvas) {
            bsOffcanvas.hide();
          }
        }
      });
    });
  }
}

// Attendance Management Mock (Coach Portal)
function initMockAttendance() {
  const markBtn = document.getElementById('save-attendance-btn');
  if (markBtn) {
    markBtn.addEventListener('click', function() {
      // Find all checkboxes checked
      const checkedBoxes = document.querySelectorAll('.attendance-check:checked');
      const totalBoxes = document.querySelectorAll('.attendance-check');
      
      const alertBox = document.getElementById('attendance-alert');
      if (alertBox) {
        alertBox.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i> Attendance recorded! ${checkedBoxes.length} of ${totalBoxes.length} students marked Present.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
      }
    });
  }
}

// Student Progress Management Mock (Coach Portal)
function initMockProgressUpdates() {
  const assessmentForm = document.getElementById('assessment-form');
  if (assessmentForm) {
    assessmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (assessmentForm.checkValidity()) {
        const studentSelect = document.getElementById('student-select');
        const studentName = studentSelect.options[studentSelect.selectedIndex].text;
        const levelSelect = document.getElementById('level-select');
        const newLevel = levelSelect.value;
        const coachNotes = document.getElementById('coach-notes-input').value;
        
        const alertBox = document.getElementById('assessment-alert');
        if (alertBox) {
          alertBox.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i> Assessment updated for <strong>${studentName}</strong>. Promoted to <strong>${newLevel}</strong>. Coach note saved.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
        }
        assessmentForm.reset();
        assessmentForm.classList.remove('was-validated');
      }
    });
  }
}

// Parent Fee Payment Simulation
function initPaymentSimulation() {
  const confirmPayBtn = document.getElementById('confirm-payment-btn');
  if (confirmPayBtn) {
    confirmPayBtn.addEventListener('click', function() {
      const modalElement = document.getElementById('paymentModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
      }
      
      // Update fee section
      const outstandingDues = document.getElementById('outstanding-dues-amount');
      if (outstandingDues) outstandingDues.textContent = '$0.00';
      
      const payButtonRow = document.getElementById('pay-now-action-row');
      if (payButtonRow) {
        payButtonRow.innerHTML = `<span class="badge bg-success py-2 px-3"><i class="bi bi-check2-circle me-1"></i> Paid in Full</span>`;
      }

      // Add to transaction history
      const tableBody = document.querySelector('#payment-history-table tbody');
      if (tableBody) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${new Date().toLocaleDateString()}</td>
          <td>Term 2 Fees (June - August)</td>
          <td>$240.00</td>
          <td><span class="badge bg-success">Paid</span></td>
          <td><button class="btn btn-sm btn-outline-secondary" onclick="window.print()"><i class="bi bi-download"></i></button></td>
        `;
        tableBody.insertBefore(row, tableBody.firstChild);
      }
      
      alert('Payment simulation successful! Mock invoice generated.');
    });
  }
}

// SVG Charts initialization
function initDashboardCharts() {
  // Let's check which dashboard is loaded and inject appropriate charts
  const parentChart = document.getElementById('parent-progress-chart-container');
  if (parentChart) {
    parentChart.innerHTML = `
      <svg viewBox="0 0 400 200" class="w-100 h-auto">
        <rect width="400" height="200" fill="none" />
        <!-- Grid lines -->
        <line x1="50" y1="150" x2="350" y2="150" stroke="#ddd" stroke-width="1" />
        <line x1="50" y1="100" x2="350" y2="100" stroke="#ddd" stroke-dasharray="5,5" />
        <line x1="50" y1="50" x2="350" y2="50" stroke="#ddd" stroke-dasharray="5,5" />
        
        <!-- Graph line -->
        <polyline fill="none" stroke="#0DCAF0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
          points="50,140 100,135 150,120 200,90 250,75 300,50 350,30" />
        
        <!-- Data dots -->
        <circle cx="50" cy="140" r="5" fill="#0A2540" stroke="#0DCAF0" stroke-width="2" />
        <circle cx="100" cy="135" r="5" fill="#0A2540" stroke="#0DCAF0" stroke-width="2" />
        <circle cx="150" cy="120" r="5" fill="#0A2540" stroke="#0DCAF0" stroke-width="2" />
        <circle cx="200" cy="90" r="5" fill="#0A2540" stroke="#0DCAF0" stroke-width="2" />
        <circle cx="250" cy="75" r="5" fill="#0A2540" stroke="#0DCAF0" stroke-width="2" />
        <circle cx="300" cy="50" r="5" fill="#0A2540" stroke="#0DCAF0" stroke-width="2" />
        <circle cx="350" cy="30" r="5" fill="#0DCAF0" stroke="#ffffff" stroke-width="2" />
        
        <!-- Labels -->
        <text x="50" y="175" font-size="10" text-anchor="middle" fill="currentColor">L1</text>
        <text x="100" y="175" font-size="10" text-anchor="middle" fill="currentColor">L2</text>
        <text x="150" y="175" font-size="10" text-anchor="middle" fill="currentColor">L3</text>
        <text x="200" y="175" font-size="10" text-anchor="middle" fill="currentColor">L4</text>
        <text x="250" y="175" font-size="10" text-anchor="middle" fill="currentColor">L5</text>
        <text x="300" y="175" font-size="10" text-anchor="middle" fill="currentColor">L6</text>
        <text x="350" y="175" font-size="10" text-anchor="middle" fill="currentColor">L7</text>
        
        <text x="40" y="143" font-size="10" text-anchor="end" fill="currentColor">Jan</text>
        <text x="40" y="93" font-size="10" text-anchor="end" fill="currentColor">Apr</text>
        <text x="40" y="43" font-size="10" text-anchor="end" fill="currentColor">Jun</text>
      </svg>
    `;
  }

  const adminChart = document.getElementById('admin-revenue-chart');
  if (adminChart) {
    adminChart.innerHTML = `
      <svg viewBox="0 0 500 200" class="w-100 h-auto">
        <!-- Bars -->
        <rect x="50" y="80" width="30" height="70" fill="#0A2540" rx="3" stroke="#0DCAF0" stroke-width="1" />
        <rect x="110" y="60" width="30" height="90" fill="#0DCAF0" rx="3" stroke="#0DCAF0" stroke-width="1" />
        <rect x="170" y="50" width="30" height="100" fill="#0A2540" rx="3" stroke="#0DCAF0" stroke-width="1" />
        <rect x="230" y="40" width="30" height="110" fill="#0DCAF0" rx="3" stroke="#0DCAF0" stroke-width="1" />
        <rect x="290" y="30" width="30" height="120" fill="#0A2540" rx="3" stroke="#0DCAF0" stroke-width="1" />
        <rect x="350" y="20" width="30" height="130" fill="#0DCAF0" rx="3" stroke="#0DCAF0" stroke-width="1" />
        <rect x="410" y="10" width="30" height="140" fill="#20c997" rx="3" stroke="#20c997" stroke-width="1" />
        
        <!-- Baseline -->
        <line x1="30" y1="150" x2="480" y2="150" stroke="#bbb" stroke-width="1" />
        
        <!-- X Labels -->
        <text x="65" y="170" font-size="11" text-anchor="middle" fill="currentColor">Dec</text>
        <text x="125" y="170" font-size="11" text-anchor="middle" fill="currentColor">Jan</text>
        <text x="185" y="170" font-size="11" text-anchor="middle" fill="currentColor">Feb</text>
        <text x="245" y="170" font-size="11" text-anchor="middle" fill="currentColor">Mar</text>
        <text x="305" y="170" font-size="11" text-anchor="middle" fill="currentColor">Apr</text>
        <text x="365" y="170" font-size="11" text-anchor="middle" fill="currentColor">May</text>
        <text x="425" y="170" font-size="11" text-anchor="middle" fill="currentColor">Jun</text>
      </svg>
    `;
  }
}
