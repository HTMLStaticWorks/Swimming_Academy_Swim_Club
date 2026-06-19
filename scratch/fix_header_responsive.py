import glob
import re

html_files = glob.glob('*dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Hide logo text on small screens
    content = content.replace('class="logo-text text-dark ms-2 fw-bold fs-5"', 'class="logo-text text-dark ms-2 fw-bold fs-5 d-none d-sm-inline"')
    
    # Hide welcome text on small screens (md and below)
    content = re.sub(r'(<div class="fw-bold fs-5 text-dark)(.*?">)', r'\1 d-none d-md-block\2', content)
    
    # Hide Logout text on extra small screens
    content = content.replace('<i class="bi bi-box-arrow-right me-2"></i> Logout', '<i class="bi bi-box-arrow-right me-sm-2"></i> <span class="d-none d-sm-inline">Logout</span>')
    
    # Also fix margin start 3 on Logout button to avoid too much spacing on mobile
    content = content.replace('btn-outline-danger ms-3', 'btn-outline-danger ms-1 ms-sm-3')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file_path}")
