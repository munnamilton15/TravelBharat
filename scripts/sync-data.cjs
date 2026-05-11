const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TS_FILE = path.join(ROOT, 'src/data/travelData.ts');
const JS_FILE = path.join(ROOT, 'standalone/data.js');

function sync() {
  if (!fs.existsSync(TS_FILE)) {
    console.error(`❌ Source file not found: ${TS_FILE}`);
    return;
  }

  console.log(`⏳ Syncing ${path.basename(TS_FILE)} -> ${path.basename(JS_FILE)}...`);
  
  let content = fs.readFileSync(TS_FILE, 'utf8');

  // 1. Remove imports
  content = content.replace(/^import .*?;?\n/gm, '');

  // 2. Remove interfaces
  content = content.replace(/^export interface \w+ \{[\s\S]*?\n\}/gm, '');

  // 3. Remove type annotations from exports (e.g., : Place[], : State[])
  content = content.replace(/export const (\w+): [\w\[\]]+ =/g, 'const $1 =');
  content = content.replace(/export const (\w+) =/g, 'const $1 =');

  // 4. Remove helper functions (everything starting with export const name = (args) =>)
  content = content.replace(/^const \w+ = \((?:.|\n)*?=> (?:.|\n)*?;/gm, '');

  // 5. Clean up any trailing exports or comments at the bottom
  content = content.replace(/\nexport const .*$/gm, '');

  // 6. Build the module.exports
  const exports = [];
  if (content.includes('const HERO_SLIDES')) exports.push('HERO_SLIDES');
  if (content.includes('const states')) exports.push('states');
  if (content.includes('const categories')) exports.push('categories');
  if (content.includes('const festivals')) exports.push('festivals');
  if (content.includes('const travelTips')) exports.push('travelTips');
  if (content.includes('const places')) exports.push('seedPlaces: places');

  const finalJs = `// ─────────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
// This file is synced from src/data/travelData.ts by scripts/sync-data.js
// ─────────────────────────────────────────────────────────────────────────────

${content.trim()}

module.exports = { ${exports.join(', ')} };
`;

  fs.writeFileSync(JS_FILE, finalJs);
  console.log('✅ Data sync complete.');
}

// Run once or watch
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes in travelData.ts...');
  fs.watchFile(TS_FILE, { interval: 1000 }, sync);
}

sync();
