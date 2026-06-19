import glob
import re

html_files = glob.glob('*dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update Header Actions to hide on mobile and add Hamburger button
    # The actions div currently looks like: <div class="d-flex align-items-center gap-2">
    # followed by the buttons. We'll replace the div class and append the hamburger after it closes.
    
    # We find the header block
    header_match = re.search(r'(<header.*?</header>)', content, re.DOTALL)
    if header_match:
        header_html = header_match.group(1)
        # Change actions div to be hidden on mobile
        new_header_html = header_html.replace('<div class="d-flex align-items-center gap-2">', '<div class="d-none d-md-flex align-items-center gap-2">')
        
        hamburger_btn = '''
    <!-- Mobile Hamburger Menu Button -->
    <button class="btn btn-outline-secondary d-md-none border-0 ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu">
      <i class="bi bi-list fs-2"></i>
    </button>
  </header>'''
        new_header_html = new_header_html.replace('</header>', hamburger_btn)
        content = content.replace(header_html, new_header_html)
    
    # 2. Update Sidebar to act as an offcanvas
    # Find the nav element
    nav_match = re.search(r'(<nav.*?class=".*?sidebar-nav.*?>)(.*?)(</nav>)', content, re.DOTALL)
    if nav_match:
        nav_open = nav_match.group(1)
        nav_inner = nav_match.group(2)
        nav_close = nav_match.group(3)
        
        # Modify the opening nav tag
        new_nav_open = nav_open.replace('class="', 'id="sidebarMenu" class="offcanvas-md offcanvas-end ')
        
        # We need the mobile actions inside the offcanvas
        mobile_actions = '''
        <!-- Mobile Actions (Theme, RTL, Logout) -->
        <div class="d-md-none mt-auto pt-4 border-top">
          <div class="d-flex justify-content-around">
            <button id="theme-toggle-mobile" class="btn btn-outline-secondary theme-toggle" title="Toggle Theme"><i class="bi bi-moon-fill"></i></button>
            <button id="rtl-toggle-mobile" class="btn btn-outline-secondary rtl-toggle" title="Toggle RTL">RTL</button>
            <a href="portal.html" class="btn btn-outline-danger"><i class="bi bi-box-arrow-right"></i> Logout</a>
          </div>
        </div>
        '''
        
        # Wrap the inner content
        new_nav_inner = f'''
        <div class="offcanvas-header d-md-none border-bottom">
          <h5 class="offcanvas-title font-serif fw-bold text-primary" id="sidebarMenuLabel">Menu</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body flex-column h-100">
          {nav_inner}
          {mobile_actions}
        </div>
        '''
        
        content = content.replace(nav_open + nav_inner + nav_close, new_nav_open + new_nav_inner + nav_close)
    
    # 3. Clean up any leftover d-none d-sm-inline on the main header logo (so it shows properly)
    content = content.replace('class="logo-text text-dark ms-2 fw-bold fs-5 d-none d-sm-inline"', 'class="logo-text text-dark ms-2 fw-bold fs-5"')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file_path}")
