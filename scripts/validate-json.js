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
  'members.json': path.join(__dirname, '..', 'schemas', 'member.schema.json'),
};


async function main() {
  // Add project_1.json to project_101.json mapping to project_0.schema.json
  for (let i = 1; i <= 101; i++) {
    const num = String(i);
    schemaMap[`project_${num}.json`] = path.join(__dirname, '..', 'schemas', 'project_0.schema.json');
  }
  const ajv = new Ajv({ allErrors: true, strict: false });
  let failed = false;

  // find json under public/data (top-level)
  const files = await glob('public/data/**/*.json', { dot: true });

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
