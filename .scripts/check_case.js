const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const imagesDir = fs.readdirSync(path.join(__dirname, '..', 'images'));
const siteDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(siteDir).filter(f => f.endsWith('.html'));

let mismatches = 0;

for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(siteDir, file), 'utf8');
    const $ = cheerio.load(html);
    
    $('img').each((i, el) => {
        let src = $(el).attr('src');
        if (src && src.startsWith('images/')) {
            const imgName = src.replace('images/', '').split('?')[0].split('#')[0]; // Remove queries or hashes
            if (!imagesDir.includes(imgName)) {
                console.log(`Mismatch in ${file}: src is "${imgName}" but it might not exist in images/ directory or case is wrong.`);
                mismatches++;
            }
        }
        
        let srcset = $(el).attr('srcset');
        if (srcset) {
            const sources = srcset.split(',').map(s => s.trim().split(' ')[0]);
            for (let source of sources) {
                if (source.startsWith('images/')) {
                    const srcImgName = source.replace('images/', '').split('?')[0].split('#')[0];
                    if (!imagesDir.includes(srcImgName)) {
                        console.log(`Mismatch in ${file} (srcset): src is "${srcImgName}" but it might not exist or case is wrong.`);
                        mismatches++;
                    }
                }
            }
        }
    });
}

console.log('Total mismatches: ' + mismatches);
