import glob
import re

html_files = glob.glob('*dashboard*.html')

favicon_snippet = """  <link rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>">"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<link rel="icon"' not in content:
        # Insert it before the first <meta name="description" or <link id="bootstrap-link"
        content = content.replace('<title>', f'{favicon_snippet}\n  <title>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Added favicon to {file_path}")
    else:
        print(f"Favicon already exists in {file_path}")
