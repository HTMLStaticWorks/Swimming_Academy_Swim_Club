import glob
import re

html_files = glob.glob('*dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace <h1 ...> with <h2 ...>
    content = re.sub(r'<h1([^>]*)>', r'<h2\1>', content)
    # Replace </h1> with </h2>
    content = content.replace('</h1>', '</h2>')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file_path}")
