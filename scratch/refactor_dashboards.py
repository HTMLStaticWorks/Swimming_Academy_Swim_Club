import glob
import re
import os

html_files = glob.glob('*dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Extract the username from the User Summary section.
    user_match = re.search(r'<h6 class="mb-0 fw-bold">(.*?)</h6>', content)
    user_name = user_match.group(1) if user_match else "User"

    # 2. Extract the original logo html to put it in the header
    logo_pattern = r'(<a href="index\.html" class="logo-container.*?</a>)\s*<!-- User Summary -->'
    logo_match = re.search(logo_pattern, content, flags=re.DOTALL)
    logo_html = logo_match.group(1) if logo_match else """
    <a href="index.html" class="logo-container d-flex justify-content-center text-decoration-none">
      <img src="https://cdnl.iconscout.com/lottie/premium/thumb/swimming-animation-gif-download-7973737.gif" alt="SwimPro Logo" class="logo-image" style="height: 40px; width: auto;">
      <span class="logo-text text-dark ms-2 fw-bold fs-5">SWIMPRO</span>
    </a>
    """

    # We need to change the logo_html layout classes since it's going into a header
    # Let's just hardcode the new logo HTML as it's cleaner and fits the horizontal header
    new_logo_html = """
    <a href="index.html" class="logo-container d-flex align-items-center text-decoration-none">
      <img src="https://cdnl.iconscout.com/lottie/premium/thumb/swimming-animation-gif-download-7973737.gif" alt="SwimPro Logo" class="logo-image" style="height: 40px; width: auto; object-fit: contain;">
      <span class="logo-text text-dark ms-2 fw-bold fs-5">SWIMPRO</span>
    </a>
    """

    header_html = f"""
  <!-- Top Header -->
  <header class="d-flex justify-content-between align-items-center px-4 py-2 border-bottom sticky-top bg-white z-3 shadow-sm">
    <!-- Logo -->
    {new_logo_html}
    
    <!-- Welcome Text -->
    <div class="fw-bold fs-5 text-dark">
      Welcome, {user_name}
    </div>
    
    <!-- Actions -->
    <div class="d-flex align-items-center gap-2">
      <button id="theme-toggle" class="btn btn-outline-secondary d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;" aria-label="Toggle Theme">
        <i class="bi bi-moon-fill"></i>
      </button>
      <button id="rtl-toggle" class="btn btn-outline-secondary fw-bold" style="height: 40px;" aria-label="Toggle Layout Direction">
        RTL
      </button>
      <a href="index.html" class="btn btn-outline-danger ms-3 d-flex align-items-center justify-content-center" style="height: 40px;">
        <i class="bi bi-box-arrow-right me-2"></i> Logout
      </a>
    </div>
  </header>
"""

    # 4. Remove the logo block from the sidebar. 
    # Let's replace the sidebar's logo with empty string.
    new_content = re.sub(logo_pattern, r'<!-- User Summary -->', content, flags=re.DOTALL)

    # 5. Remove the toggles and logout from sidebar
    # We want to remove the <hr class="my-4"> and everything after it up to </nav>
    remove_bottom_pattern = r'<hr class="my-4">\s*<div class="d-flex flex-row gap-2 mb-3">.*?</div>\s*<a href="index\.html" class="btn btn-outline-danger w-100">.*?</a>\s*(</nav>)'
    new_content = re.sub(remove_bottom_pattern, r'\1', new_content, flags=re.DOTALL)

    # 3. Inject the header right after <body>
    new_content = re.sub(r'<body>\s*', r'<body>\n' + header_html, new_content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {file_path}")
