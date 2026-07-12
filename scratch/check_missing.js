import fs from 'fs';
import path from 'path';

const fileA = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-a.json');
const fileB = path.join(process.cwd(), 'src', 'lib', 'items', 'magic-table-b.json');

const itemsA = JSON.parse(fs.readFileSync(fileA, 'utf-8'));
const itemsB = JSON.parse(fs.readFileSync(fileB, 'utf-8'));

const missingA = [...new Set(itemsA.filter(i => !i.description).map(i => i.name))];
const missingB = [...new Set(itemsB.filter(i => !i.description).map(i => i.name))];

console.log("=== TABLE A MISSING DESCRIPTIONS ===");
console.log(JSON.stringify(missingA));
console.log("\n=== TABLE B MISSING DESCRIPTIONS ===");
console.log(JSON.stringify(missingB));
