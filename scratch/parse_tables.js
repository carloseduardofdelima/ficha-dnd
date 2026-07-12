import fs from 'fs';
import path from 'path';

// Let's parse all CSV files matching the Table pattern in the root directory and generate their respective JSON files
const files = fs.readdirSync(process.cwd());
const tableFiles = files.filter(f => f.startsWith('Random Magic Item Tables') && f.endsWith('.csv'));

tableFiles.forEach(file => {
  const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
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

  // Determine output file name from input CSV filename
  // Ex: "Random Magic Item Tables (2014).xlsx - Table B (Minor, Uncommon).csv" -> "magic-table-b.json"
  let outputName = 'magic-table-unknown.json';
  if (file.includes('Table A')) {
    outputName = 'magic-table-a.json';
  } else if (file.includes('Table B')) {
    outputName = 'magic-table-b.json';
  } else if (file.includes('Table C')) {
    outputName = 'magic-table-c.json';
  } else if (file.includes('Table D')) {
    outputName = 'magic-table-d.json';
  } else if (file.includes('Table E')) {
    outputName = 'magic-table-e.json';
  } else if (file.includes('Table F')) {
    outputName = 'magic-table-f.json';
  } else if (file.includes('Table G')) {
    outputName = 'magic-table-g.json';
  } else if (file.includes('Table H')) {
    outputName = 'magic-table-h.json';
  } else if (file.includes('Table I')) {
    outputName = 'magic-table-i.json';
  }

  const outputDir = path.join(process.cwd(), 'src', 'lib', 'items');
  fs.writeFileSync(
    path.join(outputDir, outputName),
    JSON.stringify(tableItems, null, 2),
    'utf-8'
  );
  console.log(`Parsed ${tableItems.length} items from ${file} to ${outputName}`);
});
