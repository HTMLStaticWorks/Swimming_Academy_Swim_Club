const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const oldViewportRegex = /<meta\s+name=[\"']viewport[\"']\s+content=[\"']width=device-width,\s*initial-scale=1\.0[\"']\s*\/?>/i;
const newViewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">';
let diffCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (oldViewportRegex.test(content)) {
    const newContent = content.replace(oldViewportRegex, newViewport);
    fs.writeFileSync(file, newContent, 'utf8');
    diffCount++;
    console.log('Updated viewport in ' + file);
  }
}
console.log('Total files updated: ' + diffCount);
