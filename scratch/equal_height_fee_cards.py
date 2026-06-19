import glob
import re

html_files = glob.glob('parent-dashboard*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Locate the FEES section
    fees_section_match = re.search(r'(<div class="dashboard-section[^>]*id="section-fees">.*?)(<h5 class="fw-bold mb-3">Payment History</h5>)', content, re.DOTALL)
    
    if fees_section_match:
        fees_html = fees_section_match.group(1)
        
        # Add h-100 to the cards in the fees section
        # We find instances of class="card p-4 border-0 shadow-sm text-center" and class="card p-4 border-0 shadow-sm"
        new_fees_html = fees_html.replace('class="card p-4 border-0 shadow-sm text-center"', 'class="card p-4 border-0 shadow-sm text-center h-100 d-flex flex-column justify-content-center"')
        new_fees_html = new_fees_html.replace('class="card p-4 border-0 shadow-sm"', 'class="card p-4 border-0 shadow-sm h-100"')
        
        content = content.replace(fees_html, new_fees_html)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated {file_path}")
