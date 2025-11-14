// batch.mjs  (ESM)
// 逐一呼叫 evaluator.mjs，對每個 URL 跑兩次，彙整統計結果。
// usage : node batch.mjs
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { promisify } from 'node:util';

const pExecFile = promisify(execFile);
const __dirname = dirname(fileURLToPath(
    import.meta.url));

// 你的 5 個頁面：
const URLS = [
    'http://localhost:4173/SC_lab_website/',
    'http://localhost:4173/SC_lab_website/projects',
    'http://localhost:4173/SC_lab_website/leader',
    'http://localhost:4173/SC_lab_website/members',
    'http://localhost:4173/SC_lab_website/news',
];

// 每個 URL 跑幾次（你要兩次）
const REPEATS = 2;

// 解析 evaluator.mjs 的輸出，抓 MB 數字
function parseMB(stdout) {
    // 期待兩行：
    // Cold load (首次):  X.XX MB
    // Warm load (快取): Y.YY MB
    const coldMatch = stdout.match(/Cold load.*?:\s*([\d.]+)\s*MB/i);
    const warmMatch = stdout.match(/Warm load.*?:\s*([\d.]+)\s*MB/i);
    const cold = coldMatch ? parseFloat(coldMatch[1]) : NaN;
    const warm = warmMatch ? parseFloat(warmMatch[1]) : NaN;
    return { cold, warm };
}

async function runOnce(url) {
    const evaluatorPath = resolve(__dirname, 'evaluator.mjs');
    const { stdout, stderr } = await pExecFile('node', [evaluatorPath, url], {
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });
    if (stderr && stderr.trim()) {
        // Puppeteer 可能會輸出一些警告到 stderr，不一定是錯誤；只在需要時顯示
        // console.warn(`[warn] ${stderr}`);
    }
    return parseMB(stdout);
}

function stats(values) {
    const arr = values.filter(v => Number.isFinite(v));
    const sum = arr.reduce((s, v) => s + v, 0);
    const avg = arr.length ? sum / arr.length : NaN;
    const min = arr.length ? Math.min(...arr) : NaN;
    const max = arr.length ? Math.max(...arr) : NaN;
    return { avg, min, max };
}

function fmt(n) {
    return Number.isFinite(n) ? n.toFixed(2) : 'NaN';
}

(async() => {
    console.log('== Batch evaluating pages (each x2 runs) ==\n');

    for (const url of URLS) {
        const coldRuns = [];
        const warmRuns = [];

        for (let i = 1; i <= REPEATS; i++) {
            process.stdout.write(`Running ${url}  [${i}/${REPEATS}] ... `);
            try {
                const { cold, warm } = await runOnce(url);
                coldRuns.push(cold);
                warmRuns.push(warm);
                console.log(`Cold=${fmt(cold)} MB, Warm=${fmt(warm)} MB`);
            } catch (e) {
                console.log('ERROR');
                console.error(e);
            }
        }

        const c = stats(coldRuns);
        const w = stats(warmRuns);

        console.log(`\nSummary for: ${url}`);
        console.log(`  Cold load  → avg=${fmt(c.avg)} MB  (min=${fmt(c.min)}, max=${fmt(c.max)})`);
        console.log(`  Warm load  → avg=${fmt(w.avg)} MB  (min=${fmt(w.min)}, max=${fmt(w.max)})`);
        console.log('------------------------------------------------------\n');
    }

    console.log('Done.');
})().catch(e => {
    console.error(e);
    process.exit(1);
});