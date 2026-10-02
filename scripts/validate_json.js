import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import AjvModule from 'ajv';
const Ajv = AjvModule.default;

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaMap = {
  // mapping: public file path (basename) -> schema file path
  'news.json': path.join(__dirname, '..', 'schemas', 'news.schema.json'),
  'leader.json': path.join(__dirname, '..', 'schemas', 'leader.schema.json'),
  'professor.json': path.join(__dirname, '..', 'schemas', 'professor.schema.json'),
  'landinginfo.json': path.join(__dirname, '..', 'schemas', 'homepage.schema.json'),
  'members.json': path.join(__dirname, '..', 'schemas', 'member.schema.json'),
  'thelabinaction.json': path.join(__dirname, '..', 'schemas', 'carousel.schema.json'),
};


/**
 * 成員編號重複會讓照片與連結對到錯的人（photo 未填時會依 id 推檔名），
 * 因此除了 schema 之外另外檢查 id 是否唯一。
 */
function hasUniqueIds(file, data) {
  if (!Array.isArray(data)) return true;
  const seen = new Map();
  const dupes = [];
  for (const item of data) {
    const id = item?.id;
    if (id === undefined || id === null) continue;
    const who = item.Chinese_name || item.English_name || '(無姓名)';
    if (seen.has(id)) dupes.push(`id "${id}"：${seen.get(id)} 與 ${who}`);
    else seen.set(id, who);
  }
  if (dupes.length) {
    console.error(`✖ ${file} 有重複的 id，請改成不重複的編號：`);
    dupes.forEach((d) => console.error(`   - ${d}`));
    return false;
  }
  return true;
}

async function main() {
  // Add project_1.json to project_101.json mapping to project_0.schema.json
  for (let i = 1; i <= 101; i++) {
    const num = String(i);
    schemaMap[`project_${num}.json`] = path.join(__dirname, '..', 'schemas', 'project_0.schema.json');
  }
  const ajv = new Ajv({ allErrors: true, strict: false });
  let failed = false;

  // 資料實際存放在 src/data；public/data 若存在（舊同步流程）也一併檢查
  const files = await glob(['src/data/**/*.json', 'public/data/**/*.json'], { dot: false });

  for (const file of files) {
    const name = path.basename(file);
    const schemaPath = schemaMap[name];
    if (!schemaPath || !fs.existsSync(schemaPath)) {
      console.log(`[validate-json] skip ${file} (no schema mapped)`);
      continue;
    }
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const validate = ajv.compile(schema);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const valid = validate(data);
    if (!valid) {
      console.error(`✖ ${file} failed schema validation:`);
      console.error(validate.errors);
      failed = true;
    } else if (name === 'members.json' && !hasUniqueIds(file, data)) {
      failed = true;
    } else {
      console.log(`✔ ${file} ok`);
    }
  }

  if (failed) {
    console.error('JSON schema validation failed');
    process.exit(2);
  } else {
    console.log('All validated JSON files OK');
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
