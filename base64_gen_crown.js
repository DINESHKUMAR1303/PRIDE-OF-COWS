import fs from 'fs';
import path from 'path';

// USER REQUESTED PATH: c:\NSCHOOL\PRIDE OF COWS\src\pages\Cart\images\crown.svg
const filePath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\pages\\Cart\\images\\crown.svg';
const outputPath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\constants\\logoConstant.js';

try {
    const bitmap = fs.readFileSync(filePath);
    const base64 = Buffer.from(bitmap).toString('base64');

    // Note: SVG mimetype
    const content = `export const LOGO_BASE64 = "data:image/svg+xml;base64,${base64}";`;

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content);
    console.log("Successfully UPDATED logoConstant.js from Cart/images/crown.svg");
} catch (e) {
    console.error(e);
}
