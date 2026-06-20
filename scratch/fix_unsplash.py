import os
import glob

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We add crop=faces to unsplash URLs to ensure faces are centered
    new_content = content.replace('&fit=crop\'', '&fit=crop&crop=faces\'')
    new_content = new_content.replace('&fit=crop\"', '&fit=crop&crop=faces\"')
    
    # Let's also handle the case where the URL ends without quotes like in some inline styles if they are unquoted
    new_content = new_content.replace('&fit=crop)', '&fit=crop&crop=faces)')

    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
