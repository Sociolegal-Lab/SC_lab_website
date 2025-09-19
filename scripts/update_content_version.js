// Import the fs-extra module for file system operations
import fs from 'fs-extra';
// Import the path module for handling file paths
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main async function to update the content version
async function main() {
  // Get the current date and time in ISO string format
  const now = new Date().toISOString();
  // Build the output file path: <current working directory>/public/data/content_version.txt
  const out = path.join(process.cwd(), 'public', 'data', 'content_version.txt');
  // Write the current timestamp to the output file (creates directories if needed)
  await fs.outputFile(out, now);
  // Log a message indicating the update was successful
  console.log('content-version updated to', now);
}

// Run the main function and handle any errors
main().catch(e => { 
  console.error(e); // Print the error to the console
  process.exit(1);  // Exit with error code 1
});
