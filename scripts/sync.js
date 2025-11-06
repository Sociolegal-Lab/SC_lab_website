// scripts/sync.js 棄用
// from public/data to src/data in order to make fallback file when fetch fails.
import fs from 'fs-extra';
import path from 'path';


async function sync() {
  try {
    // src/data should not has any file that public/data does not have
    
    await fs.copy('public/data', 'src/data', { overwrite: true });
    console.log('synced public/data -> src/data');

    // Remove files in src/data that do not exist in public/data
    const publicFiles = await fs.readdir('public/data');
    const srcFiles = await fs.readdir('src/data');

    for (const file of srcFiles) {
      if (!publicFiles.includes(file)) {
        await fs.remove(path.join('src/data', file));
        console.log(`removed src/data/${file} (not in public/data)`);
      }
    }
  } catch (e) {
    console.error('sync error', e);
    process.exit(1);
  }
}

sync();
