import glob
import re

html_files = glob.glob('parent-dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace col-md-8 and col-md-4 specifically in the progress section to stack the cards
    # We will look for "Lesson Progress" or "Evaluation Checklist" area
    
    # Simple replace:
    # First, let's find the section-progress
    progress_section_match = re.search(r'(<div class="dashboard-section[^>]*id="section-progress">.*?)(<div class="dashboard-section)', content, re.DOTALL)
    
    if progress_section_match:
        progress_html = progress_section_match.group(1)
        new_progress_html = progress_html.replace('col-md-8', 'col-12').replace('col-md-4', 'col-12')
        content = content.replace(progress_html, new_progress_html)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated {file_path}")
    else:
        # Fallback if there's no other section after it (end of main)
        progress_section_match = re.search(r'(<div class="dashboard-section[^>]*id="section-progress">.*?)((?:</main>)|(?:<!-- SECTION))', content, re.DOTALL)
        if progress_section_match:
            progress_html = progress_section_match.group(1)
            new_progress_html = progress_html.replace('col-md-8', 'col-12').replace('col-md-4', 'col-12')
            content = content.replace(progress_html, new_progress_html)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            print(f"Updated {file_path}")
