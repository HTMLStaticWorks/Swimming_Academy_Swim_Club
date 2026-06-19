import glob
import re

html_files = glob.glob('parent-dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Locate the ACHIEVEMENTS section
    achievements_match = re.search(r'(<div class="dashboard-section[^>]*id="section-achievements">.*?)(<div class="dashboard-section|<main>|</div>\s*</main>)', content, re.DOTALL)
    
    if achievements_match:
        achievements_html = achievements_match.group(1)
        
        # Add h-100 and flex layout to the cards
        new_achievements_html = achievements_html.replace('class="card p-4 border-0 shadow-sm text-center"', 'class="card p-4 border-0 shadow-sm text-center h-100 d-flex flex-column"')
        
        # Change mt-3 on the buttons to mt-auto to push them to the bottom
        new_achievements_html = new_achievements_html.replace('class="btn btn-sm btn-outline-info mt-3"', 'class="btn btn-sm btn-outline-info mt-auto"')
        
        content = content.replace(achievements_html, new_achievements_html)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated {file_path}")
