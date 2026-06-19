const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

let updatedCount = 0;
for (const file of files) {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace bootstrap-icons@1.10.5 with bootstrap-icons@1.11.3
    const oldVersion = 'bootstrap-icons@1.10.5';
    const newVersion = 'bootstrap-icons@1.11.3';
    
    if (content.includes(oldVersion)) {
      const newContent = content.split(oldVersion).join(newVersion);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated Bootstrap Icons version in ${file}`);
      updatedCount++;
    }
  }
}

console.log(`Successfully updated ${updatedCount} files to Bootstrap Icons 1.11.3.`);
