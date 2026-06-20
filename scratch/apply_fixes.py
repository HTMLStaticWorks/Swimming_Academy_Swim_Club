import os
import glob

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content
    
    # 1. Fees -> Pricing
    new_content = new_content.replace('>Fees</a>', '>Pricing</a>')
    new_content = new_content.replace('>Levels &amp; Fees</a>', '>Levels &amp; Pricing</a>')
    new_content = new_content.replace('>Levels & Fees</a>', '>Levels & Pricing</a>')
    new_content = new_content.replace('</i> Fees</a>', '</i> Pricing</a>')
    new_content = new_content.replace('data-section="section-fees"><i class="bi bi-credit-card-fill me-2"></i> Payments</a>', 'data-section="section-fees"><i class="bi bi-credit-card-fill me-2"></i> Pricing</a>')
    new_content = new_content.replace('data-section="section-finances"><i class="bi bi-cash-stack me-2"></i> Fees</a>', 'data-section="section-finances"><i class="bi bi-cash-stack me-2"></i> Pricing</a>')
    new_content = new_content.replace('SECTION 4: FEES', 'SECTION 4: PRICING')
    new_content = new_content.replace('Term Fees & Invoices', 'Term Pricing & Invoices')
    new_content = new_content.replace('Term 1 Subscription Fees', 'Term 1 Subscription Pricing')

    # 2. Unsplash fix
    new_content = new_content.replace('&fit=crop\'', '&fit=crop&crop=faces\'')
    new_content = new_content.replace('&fit=crop\"', '&fit=crop&crop=faces\"')
    new_content = new_content.replace('&fit=crop)', '&fit=crop&crop=faces)')

    # 3. center/cover to top center / cover
    new_content = new_content.replace('center/cover', 'top center / cover')
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
