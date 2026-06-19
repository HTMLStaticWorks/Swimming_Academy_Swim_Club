const fs = require('fs');
const path = require('path');

const files = [
  '404.html',
  'admin-dashboard.html',
  'coach-dashboard.html',
  'coming-soon.html',
  'login.html',
  'parent-dashboard-1.html',
  'parent-dashboard-2.html',
  'parent-dashboard-3.html',
  'parent-dashboard.html',
  'portal.html',
  'register.html'
];

let revertedCount = 0;
for (const file of files) {
  const filePath = path.join(__dirname, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const footerRegex = /\n\s*<!-- Footer -->\n\s*<footer\b[^>]*>[\s\S]*?<\/footer>\n?/i;
    
    if (footerRegex.test(content)) {
      const newContent = content.replace(footerRegex, '');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Reverted footer from ${file}`);
      revertedCount++;
    } else {
      console.log(`No footer found to revert in ${file}`);
    }
  } catch (e) {
    console.error(`Error processing ${file}: ${e.message}`);
  }
}

console.log(`Successfully reverted ${revertedCount} files.`);
