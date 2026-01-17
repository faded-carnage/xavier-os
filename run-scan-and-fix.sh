#!/usr/bin/env bash
set -euo pipefail

echo "== create find-const-no-init.js (if missing) =="
cat > find-const-no-init.js <<'EOF'
#!/usr/bin/env node
// Scans .js/.jsx/.ts/.tsx files (excluding node_modules, .git, dist, build) for
// const declarations that lack an initializer (e.g., "const foo;").

const fs = require('fs');
const path = require('path');

const exts = ['.js', '.jsx', '.ts', '.tsx'];
const ignoreDirs = ['node_modules', '.git', 'dist', 'build'];

function shouldIgnore(p) {
  return ignoreDirs.some(d => p.split(path.sep).includes(d));
}

function scanDir(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (shouldIgnore(full)) continue;
    if (e.isDirectory()) scanDir(full);
    else if (exts.includes(path.extname(e.name))) checkFile(full);
  }
}

function checkFile(file) {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (err) {
    return;
  }
  const lines = text.split(/\\r?\\n/);
  lines.forEach((line, i) => {
    const ln = line.trim();
    // match: const identifier;
    if (/^const\\s+[A-Za-z_$][A-Za-z0-9_$]*\\s*;$/.test(ln)) {
      console.log(`${file}:${i+1}: ${ln}`);
    }
    // match destructuring without initializer: const { a, b };  or const [x, y];
    if (/^const\\s+[\\{\\[][^;]*[\\}\\]]\\s*;$/.test(ln)) {
      console.log(`${file}:${i+1}: ${ln}`);
    }
    // possible split declarations (const on line by itself followed later by ;)
    if (/^const\\s*$/.test(ln) && /^\\s*;/.test(lines[i+1] || '')) {
      console.log(`${file}:${i+1}: possible split const declaration`);
    }
  });
}

console.log('Scanning for const declarations without initializers...');
scanDir(process.cwd());
console.log('Scan complete.');
EOF

chmod +x find-const-no-init.js
echo "== running scanner =="
node find-const-no-init.js | tee scanner-output.txt

echo
echo "== running eslint --fix (may modify files) =="
# run fix; don't fail the script if eslint exits nonzero
if npx eslint --version >/dev/null 2>&1; then
  npx eslint . --ext .js,.jsx,.ts,.tsx --fix | tee eslint-fix-output.txt || true
else
  echo "eslint not available via npx; run 'npm install' first" | tee eslint-fix-output.txt
fi

echo
echo "== running npm run lint =="
npm run lint 2>&1 | tee eslint-output.txt || true

echo
echo "== done =="
echo "Files created: scanner-output.txt, eslint-fix-output.txt, eslint-output.txt"
echo "If you want to auto-commit fixes to a branch, uncomment and run the commit block below AFTER reviewing changes."
cat <<'GITINFO'

# Optional git commands (review changes before running)
# git checkout -b fix/syntax-const-init
# git add .
# git commit -m "fix: apply eslint fixes and initialize const declarations"
# git push origin fix/syntax-const-init

GITINFO