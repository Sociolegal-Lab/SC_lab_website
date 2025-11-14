// evaluator.mjs  (ESM 版本)
// usage : 
// 1. first install the package : npm i puppeteer   
// 2. run the command : node evaluator.js https://your-site.github.io/  
import puppeteer from 'puppeteer';

function fmtMB(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

async function bytesTransferred(page) {
    return await page.evaluate(() => {
        const sum = (arr) => arr.reduce((s, e) => s + (e.transferSize || 0), 0);
        const nav = performance.getEntriesByType('navigation');
        const res = performance.getEntriesByType('resource');
        return sum(nav) + sum(res); // bytes (實際傳輸量，含壓縮)
    });
}

async function scrollToBottom(page) {
    await page.evaluate(async() => {
        await new Promise((resolve) => {
            let lastY = -1;
            const timer = setInterval(() => {
                window.scrollBy(0, 1200);
                if (window.scrollY === lastY) {
                    clearInterval(timer);
                    resolve();
                }
                lastY = window.scrollY;
            }, 120);
        });
    });
}

async function main() {
    const url = process.argv[2];
    if (!url) {
        console.error('Usage: node evaluator.mjs <url>');
        process.exit(1);
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 冷載入（無快取）
    await page.setCacheEnabled(false);
    await page.goto(url, { waitUntil: 'networkidle2' });
    await scrollToBottom(page);
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 });
    const cold = await bytesTransferred(page);

    // 熱載入（同分頁快取）
    await page.setCacheEnabled(true);
    await page.reload({ waitUntil: 'networkidle2' });
    await scrollToBottom(page);
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 });
    const warm = await bytesTransferred(page);

    console.log(`Cold load (首次): ${fmtMB(cold)}`);
    console.log(`Warm load (快取): ${fmtMB(warm)}`);

    await browser.close();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});