import { mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
// Only browser files belong in the deployment. Never execute app.js on Node.
const files = ['index.html', 'style.css', 'app.js', 'globe-gallery.js',
  'globe-gallery.css', 'adjustments.js', 'adjustments.css', 'images.json', 'assets'];
for (const file of files) await cp(path.join(root, file), path.join(output, file), { recursive: true });
console.log('Static website built in dist/');
