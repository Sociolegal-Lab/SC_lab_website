import fs from 'fs';
import path from 'path';

function generateProjectsIndex() {
    const __dirname = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
	const dir = path.join(__dirname, '../src/data/projects');
	const outputFile = path.join(dir, 'projects_index.json');

	// Read all files in the directory
	const files = fs.readdirSync(dir);

	// Verify all files are named correctly
	const validPattern = /^project_\d+\.(json|md)$/i;
	// 封面圖可用 png/jpg/jpeg/gif/webp，檔名允許 project_<number> 後帶後綴（例如 project_9_tmp.png）
	const imagePattern = /^project_\d+[\w-]*\.(png|jpe?g|gif|webp)$/i;
	const allowedOtherFiles = new Set(['projects_index.json', 'template.md']);
	const invalidFiles = files.filter(
		f => !validPattern.test(f) && !imagePattern.test(f) && !allowedOtherFiles.has(f)
	);
	if (invalidFiles.length > 0) {
		throw new Error(
			`Invalid filenames detected:\n` +
			invalidFiles.map(f => `  - ${f}`).join('\n') +
			`\n\nAll data files must be named as project_<number>.json or project_<number>.md.`
		);
	}

	console.log(`filenames ok (${files.length} files checked).`);

	// projects_index.json 的順序＝網站上的展示順序，並且可以刻意不列出某些專案，
	// 屬於人工維護的內容。因此預設「只驗證檔名，不動 projects_index.json」，
	// 只有明確加上 --write 時才重新產生（會覆蓋現有順序與篩選，請自行確認）。
	if (!process.argv.includes('--write')) {
		return;
	}

	// Filter for .json and .md files only
	const filtered = files.filter(f => validPattern.test(f));

	fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2) + '\n', 'utf8');
	console.warn(
		`⚠ projects_index.json 已依檔名重新產生（${filtered.length} 筆），` +
		`原本的展示順序與排除設定已被覆蓋，請檢查後再提交。`
	);
}

// Run the function when script is called
generateProjectsIndex();
