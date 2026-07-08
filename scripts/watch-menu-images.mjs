import { readFileSync, writeFileSync, watchFile } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mapPath = resolve(__dirname, '../menu-images.json');
const dishesPath = resolve(__dirname, '../src/data/dish/dishes.json');

function applyImages() {
	let map;
	try {
		map = JSON.parse(readFileSync(mapPath, 'utf8'));
	} catch (error) {
		console.error(`[menu-images] could not read/parse menu-images.json: ${error.message}`);
		return;
	}

	const dishes = JSON.parse(readFileSync(dishesPath, 'utf8'));
	const byslug = new Map(map.dishes.map((d) => [d.slug, d.imageUrl]));

	let applied = 0;
	for (const dish of dishes) {
		const url = byslug.get(dish.slug);
		if (url && url.trim() && dish.image !== url.trim()) {
			dish.image = url.trim();
			applied++;
		}
	}

	if (applied > 0) {
		writeFileSync(dishesPath, JSON.stringify(dishes, null, '\t') + '\n');
		console.log(`[menu-images] applied ${applied} image URL${applied === 1 ? '' : 's'} -> dishes.json`);
	}
}

console.log('[menu-images] watching menu-images.json for changes... (Ctrl+C to stop)');
applyImages();
watchFile(mapPath, { interval: 1000 }, () => applyImages());
