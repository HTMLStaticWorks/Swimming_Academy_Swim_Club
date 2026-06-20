const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexHtmlPath = path.join(dir, 'index.html');

try {
  const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Match <footer ...>...</footer>
  const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/i;
  const footerMatch = indexContent.match(footerRegex);
  
  if (!footerMatch) {
    console.error('Could not find footer in index.html');
    process.exit(1);
  }
  
  const footerContent = "\n  <!-- Footer -->\n  " + footerMatch[0] + "\n";
  console.log('Extracted footer from index.html (length: ' + footerContent.length + ' chars)');

  const files = fs.readdirSync(dir);
  
  let updatedCount = 0;
  for (const file of files) {
    if (file.endsWith('.html') && file !== 'index.html') {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (footerRegex.test(content)) {
        // Replace existing footer
        const newContent = content.replace(footerRegex, footerMatch[0]);
        if (newContent !== content) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`Updated existing footer in ${file}`);
          updatedCount++;
        }
      } else {
        // Insert footer before <!-- Bootstrap 5 JavaScript Bundle --> or </body>
        let newContent = content;
        if (newContent.includes('<!-- Bootstrap 5 JavaScript Bundle -->')) {
          newContent = newContent.replace('<!-- Bootstrap 5 JavaScript Bundle -->', footerContent + '\n  <!-- Bootstrap 5 JavaScript Bundle -->');
        } else if (newContent.includes('</body>')) {
          newContent = newContent.replace('</body>', footerContent + '\n</body>');
        } else {
          newContent += footerContent;
        }
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Injected missing footer into ${file}`);
        updatedCount++;
      }
    }
  }
  
  console.log(`Successfully updated ${updatedCount} files.`);
} catch (e) {
  console.error(e);
}
