import fs from 'fs';
import path from 'path';

async function fetchIconTree() {
  const repo = 'Gwillewyn/dnd-item-icons-by-gwill';
  // Try master first, then main if needed
  let branch = 'master';
  let url = `https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`;
  
  console.log(`Buscando árvore de arquivos de ${repo} (branch: ${branch})...`);
  
  let response = await fetch(url, {
    headers: {
      'User-Agent': 'DND-Ficha-App'
    }
  });

  if (!response.ok) {
    console.log(`Falha ao buscar master, tentando branch main...`);
    branch = 'main';
    url = `https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`;
    response = await fetch(url, {
      headers: {
        'User-Agent': 'DND-Ficha-App'
      }
    });
  }

  if (!response.ok) {
    throw new Error(`Erro ao buscar repositório: ${response.statusText}`);
  }

  const data = await response.json();
  const tree = data.tree as Array<{ path: string; type: string }>;
  
  const iconMap: Record<string, string> = {};
  
  // We want to map clean names to their paths in the repo
  // e.g. "Weapons/dagger.svg" -> map key: "dagger" -> value: "Weapons/dagger.svg"
  for (const file of tree) {
    if (file.type === 'blob' && file.path.endsWith('.svg')) {
      const parts = file.path.split('/');
      const filenameWithExt = parts[parts.length - 1];
      const filename = filenameWithExt.replace('.svg', '').toLowerCase();
      
      // Clean and normalize names
      // Example: "leather-armor" or "leather_armor" or "leather armor"
      // Also map standard variants
      iconMap[filename] = file.path;
      
      // Replace dashes and underscores with spaces to support loose matches
      const cleanName = filename.replace(/[-_]/g, ' ');
      iconMap[cleanName] = file.path;
    }
  }

  const outputDir = path.join(__dirname, '../src/lib/items');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'icons-map.json');
  fs.writeFileSync(outputPath, JSON.stringify({ branch, icons: iconMap }, null, 2), 'utf-8');
  
  console.log(`Sucesso! Mapa de ícones gerado com ${Object.keys(iconMap).length} chaves mapeadas.`);
  console.log(`Arquivo salvo em: ${outputPath}`);
}

fetchIconTree().catch(err => {
  console.error('Erro na execução:', err);
  process.exit(1);
});
