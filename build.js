// Genera public/index.html a partir de src/index.src.html, incrustando solo los íconos SVG usados.
// Ilustraciones: Fluent Emoji Flat © Microsoft, licencia MIT.
const fs = require('fs');
const path = require('path');
const set = require('@iconify-json/fluent-emoji-flat/icons.json');
const src = fs.readFileSync(path.join(__dirname, 'src', 'index.src.html'), 'utf8');
const names = new Set();
for (const m of src.matchAll(/['"]([a-z0-9]+(?:-[a-z0-9]+)*)['"]/g)) if (set.icons[m[1]]) names.add(m[1]);
const local = new Set([...src.matchAll(/ICONS\.([a-z]+)\s*=/g)].map(m => m[1])); // íconos dibujados en el propio código
for (const m of src.matchAll(/ICONS\.([a-z]+)/g)) if (!local.has(m[1])) names.add(m[1]);
for (const m of src.matchAll(/ICONS\['([a-z0-9-]+)'\]/g)) names.add(m[1]);
const out = {};
for (const n of names) {
  if (!set.icons[n]) { console.error('Ícono inexistente:', n); process.exit(1); }
  out[n] = set.icons[n].body;
}
fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), src.replace('__ICONS__', JSON.stringify(out)));
console.log(`public/index.html generado con ${names.size} íconos`);
