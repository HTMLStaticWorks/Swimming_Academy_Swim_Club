const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexHtmlPath = path.join(dir, 'index.html');
const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/i;
const footerMatch = indexContent.match(footerRegex);

const indexFooter = footerMatch[0];

const files = fs.readdirSync(dir);
let allMatch = true;

for (const file of files) {
  if (file.endsWith('.html') && file !== 'index.html') {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const match = content.match(footerRegex);
    if (match) {
      if (match[0] !== indexFooter) {
        console.log(`${file} footer differs!`);
        allMatch = false;
      } else {
        console.log(`${file} footer is EXACTLY identical.`);
      }
    }
  }
}

if (allMatch) {
  console.log('VERIFICATION PASSED: All footers are 100% identical.');
} else {
  console.log('VERIFICATION FAILED: Some footers differ.');
}
