import fs from 'fs';
import path from 'path';

// This script processes the uploaded "Random Magic Item Tables (2014).xlsx - Table A (Minor, Common).csv"
// and maps it. Since the prompt says "implemente todas as tabelas que tem lá" (implement all tables in there),
// and the user provided Table A, let's parse it and integrate its data (adding Rarity to the items in itemsData or creating a Table A generator).
// Wait, the CSV contains columns: d100, Item, Type, Rarity, Attune, Source.
// Let's read the CSV file, clean and parse the items, and either save the table itself as a roller table or merge rarity information.
// Actually, it's a random rolling table! "Table A (Minor, Common)".
// Let's parse the CSV and output a JSON representation of Table A.
// Let's write a node script to do this.

const csvPath = path.join(process.cwd(), 'Random Magic Item Tables (2014).xlsx - Table A (Minor, Common).csv');
const content = fs.readFileSync(csvPath, 'utf-8');

const lines = content.split('\n');
const tableItems = [];

for (let i = 2; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const parts = [];
  let current = '';
  let inQuotes = false;
  
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    const char = line[charIndex];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  
  if (parts.length < 6) continue;
  
  const d100Val = parts[0];
  const item = parts[1]?.replace(/^"|"$/g, '').trim();
  const type = parts[2]?.replace(/^"|"$/g, '').trim();
  const rarity = parts[3]?.replace(/^"|"$/g, '').trim();
  const attune = parts[4]?.replace(/^"|"$/g, '').trim();
  const source = parts[5]?.replace(/^"|"$/g, '').trim();
  
  if (!d100Val || isNaN(parseInt(d100Val))) continue;
  
  tableItems.push({
    d100: parseInt(d100Val),
    name: item,
    type,
    rarity,
    attune: attune === 'Yes',
    source
  });
}

// Write the parsed items table
const outputDir = path.join(process.cwd(), 'src', 'lib', 'items');
fs.writeFileSync(
  path.join(outputDir, 'magic-table-a.json'),
  JSON.stringify(tableItems, null, 2),
  'utf-8'
);

console.log(`Successfully parsed ${tableItems.length} items from Table A CSV.`);
