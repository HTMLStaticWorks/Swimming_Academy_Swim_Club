import glob
import re

html_files = glob.glob('*dashboard*.html')

old_favicon = '<link rel="icon" type="image/gif" href="https://cdnl.iconscout.com/lottie/premium/thumb/swimming-animation-gif-download-7973737.gif">'
new_favicon = '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌊</text></svg>">'

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_favicon in content:
        content = content.replace(old_favicon, new_favicon)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Replaced favicon in {file_path}")
    else:
        print(f"Old favicon not found in {file_path}")
