const fs = require('fs');
const path = require('path');

const imagesDir = fs.readdirSync(path.join(__dirname, '..', 'images'));
const siteDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(siteDir).filter(f => f.endsWith('.html'));

let totalFixed = 0;

for (const file of htmlFiles) {
    const filePath = path.join(siteDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Match srcset="images/file_mobile.webp 500w, images/file.webp 1024w"
    const srcsetRegex = /srcset="([^"]+)"/g;
    
    html = html.replace(srcsetRegex, (match, srcsetVal) => {
        let sources = srcsetVal.split(',').map(s => s.trim());
        let validSources = [];
        let changed = false;

        for (let source of sources) {
            const parts = source.split(' ');
            const srcPath = parts[0];
            
            if (srcPath.startsWith('images/')) {
                const srcImgName = srcPath.replace('images/', '').split('?')[0].split('#')[0];
                if (imagesDir.includes(srcImgName)) {
                    validSources.push(source);
                } else {
                    changed = true; // missing file
                }
            } else {
                validSources.push(source);
            }
        }

        if (changed) {
            modified = true;
            if (validSources.length > 0) {
                return `srcset="${validSources.join(', ')}"`;
            } else {
                return ``; // Remove the attribute entirely if no valid sources
            }
        }
        return match;
    });
    
    // Cleanup empty srcsets left behind if any
    html = html.replace(/ srcset=""/g, '');

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Fixed srcset in ${file}`);
        totalFixed++;
    }
}

console.log('Total files fixed: ' + totalFixed);
