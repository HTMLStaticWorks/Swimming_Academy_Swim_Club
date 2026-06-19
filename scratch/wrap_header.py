import glob
import re

html_files = glob.glob('*dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add flex-wrap and gap-2 to the header so it stacks nicely if there isn't enough space
    if 'flex-wrap' not in content:
        content = content.replace('d-flex justify-content-between align-items-center px-4 py-2 border-bottom sticky-top bg-white z-3 shadow-sm', 
                                  'd-flex justify-content-between align-items-center px-4 py-2 border-bottom sticky-top bg-white z-3 shadow-sm flex-wrap gap-2')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file_path}")
