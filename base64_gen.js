import fs from 'fs';
import path from 'path';

const filePath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\images\\icons\\logo.png';
const outputPath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\constants\\logoConstant.js'; // Ensure directory exists or use existing folder

try {
    const bitmap = fs.readFileSync(filePath);
    const base64 = Buffer.from(bitmap).toString('base64');
    const content = `export const LOGO_BASE64 = "data:image/png;base64,${base64}";`;

    // Ensure dir exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content);
    console.log("Successfully wrote logoConstant.js");
} catch (e) {
    console.error(e);
}
