const fs = require('fs');
const path = require('path');

const dir = 'e:/OfficeDownloads_/MayJuneWebsite/Swimming_Academy_Swim_Club';

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processFiles(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We want to find columns that contain a card. 
      // Usually like: <div class="col-md-6 col-lg-3"> \n <div class="card-custom">
      // Let's replace class="col-..." with class="col-... d-flex"
      
      const regex = /<div class="([^"]*col-[^"]*)"(?!\s*[^>]*d-flex)>(?:\s*<!--[^>]*-->\s*)*\s*<div class="([^"]*(?:card-custom|card\b)[^"]*)"/g;
      
      let modified = false;
      content = content.replace(regex, (match, colClasses, cardClasses) => {
        // Only append d-flex if it's not already there
        let newColClasses = colClasses;
        if (!colClasses.includes('d-flex')) {
          newColClasses = colClasses + ' d-flex align-items-stretch';
        }
        
        let newCardClasses = cardClasses;
        if (!cardClasses.includes('w-100')) {
          newCardClasses = cardClasses + ' w-100';
        }
        
        modified = true;
        return `<div class="${newColClasses}">\n          <div class="${newCardClasses}"`;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

processFiles(dir);
