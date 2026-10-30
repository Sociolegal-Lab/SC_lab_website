// 檢查 src/data/projects/ 底下的檔名是否符合規則。
//
// 專案的展示順序原本由人工維護的 projects_index.json 決定，現已改為依 duration
// 自動計算（見 src/utils/sortProjects.js），該檔案因此移除，這個腳本也不再產生它。
// 要讓某個專案不顯示，把它的 published 設為 false 即可。
import fs from 'fs';
import path from 'path';

function verifyProjectFilenames() {
	const __dirname = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
	const dir = path.join(__dirname, '../src/data/projects');

	const files = fs.readdirSync(dir);

	// 資料與內頁：project_<編號>.json / project_<編號>.md
	const dataPattern = /^project_\d+\.(json|md)$/i;
	// 封面圖可用 png/jpg/jpeg/gif/webp，檔名允許 project_<編號> 後帶後綴（例如 project_9_tmp.png）
	const imagePattern = /^project_\d+[\w-]*\.(png|jpe?g|gif|webp)$/i;
	const allowedOtherFiles = new Set(['template.md', 'README.md']);

	const invalidFiles = files.filter(
		f => !dataPattern.test(f) && !imagePattern.test(f) && !allowedOtherFiles.has(f)
	);

	if (invalidFiles.length > 0) {
		throw new Error(
			`Invalid filenames detected:\n` +
			invalidFiles.map(f => `  - ${f}`).join('\n') +
			`\n\nAll data files must be named as project_<number>.json or project_<number>.md.`
		);
	}

	// 每個 .json 都應該有對應編號的 .md 或封面圖才算完整，缺少不視為錯誤，僅提示
	const ids = files
		.filter(f => /^project_\d+\.json$/i.test(f))
		.map(f => f.match(/^project_(\d+)\.json$/i)[1]);

	for (const id of ids) {
		const coverPattern = new RegExp(`^project_${id}[\\w-]*\\.(png|jpe?g|gif|webp)$`, 'i');
		if (!files.some(f => coverPattern.test(f))) {
			console.warn(`[verify] project_${id} 沒有對應的封面圖`);
		}
	}

	console.log(`filenames ok (${files.length} files checked, ${ids.length} projects).`);
}

verifyProjectFilenames();
