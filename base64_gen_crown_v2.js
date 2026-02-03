import fs from 'fs';
import path from 'path';

const filePath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\pages\\Cart\\images\\crown.svg';
const outputPath = 'c:\\NSCHOOL\\PRIDE OF COWS\\src\\constants\\logoConstant.js';

try {
    let svg = fs.readFileSync(filePath, 'utf8');
    // Optimize: Remove newlines and excess whitespace
    svg = svg.replace(/\n/g, '').replace(/\s+/g, ' ');

    // URL Encode
    const encoded = encodeURIComponent(svg)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');

    const content = `export const LOGO_BASE64 = \`data:image/svg+xml;charset=utf-8,\${encoded}\`;`;

    // Also try Base64 version just in case, but let's stick to one
    // Re-reading for Base64 to offer an alternative if needed
    const bitmap = fs.readFileSync(filePath);
    const base64 = Buffer.from(bitmap).toString('base64');
    const contentBase64 = `export const LOGO_BASE64 = "data:image/svg+xml;base64,${base64}";`;

    // Writing the Base64 version as it is generally more standard for Razorpay than utf8
    fs.writeFileSync(outputPath, contentBase64);

    console.log("Successfully wrote SVG Base64 to logoConstant.js");
} catch (e) {
    console.error(e);
}
