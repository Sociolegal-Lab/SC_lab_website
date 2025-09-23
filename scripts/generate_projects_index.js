import fs from 'fs';
import path from 'path';

function generateProjectsIndex() {
    const __dirname = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
	const dir = path.join(__dirname, '../public/data/projects');
	const outputFile = path.join(dir, 'projects_index.json');

	// Read all files in the directory
	const files = fs.readdirSync(dir);

	// Verify all files are named correctly
	const validPattern = /^project_\d+\.(json|md)$/i;
	const invalidFiles = files.filter(f => !validPattern.test(f) && !f.endsWith('.png') && f !== 'projects_index.json');
	if (invalidFiles.length > 0) {
		throw new Error(
			`Invalid filenames detected:\n` +
			invalidFiles.map(f => `  - ${f}`).join('\n') +
			`\n\nAll data files must be named as project_<number>.json or project_<number>.md.`
		);
	}

	// Filter for .json and .md files only
	const filtered = files.filter(f => validPattern.test(f));

	// Write to projects_index.json (overwrite)
	fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2), 'utf8');
	console.log(`projects_index.json updated with ${filtered.length} files.`);
}

// Run the function when script is called
generateProjectsIndex();
