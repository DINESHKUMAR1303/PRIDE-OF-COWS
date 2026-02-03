import fs from 'fs';
import path from 'path';

// USER REQUESTED PATH: src/pages/Cart/images/logo.png
const filePath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\pages\\Cart\\images\\logo.png';
const outputPath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\constants\\logoConstant.js';

try {
    const bitmap = fs.readFileSync(filePath);
    const base64 = Buffer.from(bitmap).toString('base64');
    const content = `export const LOGO_BASE64 = "data:image/png;base64,${base64}";`;

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content);
    console.log("Successfully UPDATED logoConstant.js from Cart/images/logo.png");
} catch (e) {
    console.error(e);
}
