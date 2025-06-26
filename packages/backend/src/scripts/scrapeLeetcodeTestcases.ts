const axios = require('axios');
const cheerio = require('cheerio');
import fs from 'fs/promises';
import path from 'path';

const LEETCODE_BASE_URL = 'https://leetcode.com/problems/';

interface TestCase {
  name: string;
  input: any; // Can be more specific if we know the structure
  expected: any; // Can be more specific
  description?: string;
}

async function scrapeLeetcodeTestcases(problemId: string): Promise<void> {
  if (!problemId) {
    console.error('Error: problemId is required.');
    process.exit(1);
  }

  const problemUrl = `${LEETCODE_BASE_URL}${problemId}/`;
  console.log(`Fetching test cases for problem: ${problemId} from ${problemUrl}`);

  try {
    // Step 3: Fetch Problem Page HTML
    console.log(`Fetching HTML from ${problemUrl}...`);
    const response = await axios.get(problemUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const htmlContent = response.data;
    console.log('Successfully fetched HTML content.');

    // Step 4: Parse Test Cases from HTML
    console.log('Parsing HTML content using cheerio...');
    const $ = cheerio.load(htmlContent);
    const testCases: TestCase[] = [];

    // LeetCode often presents examples with strong tags for "Example X:", "Input:", "Output:"
    // and the actual data within <pre> tags or nearby text.
    // This is a common pattern; actual selectors might vary and need refinement.
    // We'll look for elements that seem to denote the start of an example.
    // A common pattern is a div or p tag containing "Example X:"
    // For simplicity, let's try to find <pre> tags first, as they often contain the I/O directly.

    $('pre').each((i, el) => {
      const rawText = $(el).text();
      // Attempt to extract Input and Output from the rawText
      // This is a very basic heuristic and will need significant improvement.
      const inputMatch = rawText.match(/Input: (.*)/);
      const outputMatch = rawText.match(/Output: (.*)/);
      const explanationMatch = rawText.match(/Explanation: (.*)/); // Sometimes present

      if (inputMatch && inputMatch[1] && outputMatch && outputMatch[1]) {
        const inputStr = inputMatch[1].trim();
        const outputStr = outputMatch[1].trim();

        testCases.push({
          name: `Scraped Example ${testCases.length + 1}`,
          // Actual parsing of inputStr and outputStr to structured data will be in the next step
                          input: inputStr, // Placeholder: raw string
                          expected: outputStr, // Placeholder: raw string
          description: explanationMatch ? explanationMatch[1].trim() : undefined,
        });
      }
    });

    if (testCases.length === 0) {
      console.warn(`No test cases found using <pre> tags for ${problemId}. The HTML structure might have changed or test cases are presented differently.`);
      // As a fallback, one might try to find specific class names if known,
      // or look for text patterns like "<strong>Input:</strong>" followed by the data.
      // For now, we'll proceed with what <pre> tags give us.
    } else {
      console.log(`Found ${testCases.length} potential test case(s) from <pre> tags.`);
    }

    // Step 5: Transform Raw Test Cases
    console.log('Transforming raw test cases...');
    const transformedTestCases = testCases.map(tc => {
      try {
        return {
          ...tc,
          input: parseLeetCodeValueString(tc.input as string),
          expected: parseLeetCodeValueString(tc.expected as string),
        };
      } catch (e) {
        console.warn(`Failed to parse input/output for test case "${tc.name}": ${(e as Error).message}`);
        console.warn(`Input: ${tc.input}`);
        console.warn(`Output: ${tc.expected}`);
        // Keep raw strings if parsing fails, or decide on an error handling strategy
        return { ...tc, input: tc.input, expected: tc.expected, errorParsing: true };
      }
    });

    // Step 6: Format for testcase.ts
    console.log('Formatting test cases for testcase.ts content...');

    const testCaseStrings = transformedTestCases.map(tc => {
      const name = tc.name || `Scraped Test Case`;
      // Use JSON.stringify to convert parsed input/expected values to string representations
      // suitable for inclusion in a TS file.
      const inputStr = JSON.stringify(tc.input, null, 2);
      const expectedStr = JSON.stringify(tc.expected, null, 2);
      const descriptionStr = tc.description ? JSON.stringify(tc.description, null, 2) : undefined;

      let tcParts = [
        `    name: ${JSON.stringify(name)}`,
        `    input: ${inputStr}`,
        `    expected: ${expectedStr}`,
      ];
      if (descriptionStr) {
        tcParts.push(`    description: ${descriptionStr}`);
      }
      if (tc.errorParsing) {
        tcParts.push(`    // Warning: Input or output for this test case may not have parsed correctly.`);
      }
      return `  {\n${tcParts.join(',\n')}\n  }`;
    }).join(',\n');

    const outputContent = `// Generated by scrapeLeetcodeTestcases.ts for problem: ${problemId}
// From: ${problemUrl}
// Timestamp: ${new Date().toISOString()}
//
// IMPORTANT NOTE:
// LeetCode employs bot detection (like Cloudflare) which may block automated scripts
// like this one, resulting in a 403 Forbidden error or incomplete data.
// For reliable scraping, a more advanced setup using a headless browser (e.g., Puppeteer)
// that can execute JavaScript and mimic real user interaction might be necessary.
// This script provides a best-effort attempt with basic HTTP requests.

import { TestCase } from "algo-lens-core/src/types";
// Note: You might need to adjust the import path for TestCase based on your project structure.
// For problem-specific types, you would import them from './types';
// e.g., import { ${problemId}Input, ${problemId}Output } from "./types";

export const testcases: TestCase<any, any>[] = [
${testCaseStrings.length > 0 ? testCaseStrings : '  // No test cases were successfully scraped or parsed.'}
];

// Reminder: Review scraped test cases for accuracy and completeness.
// Complex data structures might require manual adjustments to the parsed input/expected values.
`;
    console.log('Successfully formatted content for testcase.ts.');

    // Step 7: Write to File
    // Note: __dirname in ESM with ts-node/bun might behave differently than CJS.
    // path.resolve should work reliably if the script is run from a consistent location.
    // Assuming the script is in packages/backend/src/scripts/
    // and problem-free is at packages/problem-free/
    // The path from packages/backend/src/scripts/scrapeLeetcodeTestcases.ts
    // to the root of the monorepo is ../../../
    // Then to problem-free is ../../../packages/problem-free
    const projectRoot = path.resolve(__dirname, '../../../');
    const problemFreeBaseDir = path.join(projectRoot, 'packages/problem-free');
    const targetDirectory = path.join(problemFreeBaseDir, problemId);
    const targetPath = path.join(targetDirectory, 'testcase.ts');

    console.log(`Ensuring directory exists at ${targetDirectory}...`);
    await fs.mkdir(targetDirectory, { recursive: true });

    console.log(`Writing test cases to ${targetPath}...`);
    await fs.writeFile(targetPath, outputContent, 'utf-8');

    console.log(`Successfully scraped and wrote test cases for ${problemId} to ${targetPath}`);
    if (transformedTestCases.some(tc => tc.errorParsing)) {
      console.warn("One or more test cases encountered parsing errors. Please review the output file carefully.");
    }
    if (testCases.length === 0) {
      console.warn("No test cases were found on the LeetCode page. The output file will be mostly empty.");
    }


  } catch (error: any) {
    if (error.isAxiosError && error.response && error.response.status === 403) {
      console.error(`Failed to scrape test cases for ${problemId}: Received a 403 Forbidden error.`);
      console.error("This likely means LeetCode (or its protection like Cloudflare) has blocked the request.");
      console.error("To scrape LeetCode reliably, a more advanced setup (e.g., using a headless browser like Puppeteer) is often required.");
    } else {
      console.error(`Failed to scrape test cases for ${problemId}:`, error);
    }
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: bun scrapeLeetcodeTestcases.ts <problemId>');
    process.exit(1);
  }
  const problemId = args[0];
  await scrapeLeetcodeTestcases(problemId);
}

// Helper function to parse LeetCode's string representation of values
function parseLeetCodeValueString(valueStr: string): any {
  const trimmedStr = valueStr.trim();

  // Attempt to parse as JSON (handles arrays, objects, strings, numbers, booleans)
  try {
    if ((trimmedStr.startsWith('[') && trimmedStr.endsWith(']')) ||
        (trimmedStr.startsWith('{') && trimmedStr.endsWith('}')) ||
        trimmedStr.startsWith('"') ||
        !isNaN(parseFloat(trimmedStr)) || // Check if it's a number
        trimmedStr === 'true' || trimmedStr === 'false') {
      // For numbers, JSON.parse can sometimes be too strict or too loose.
      // e.g. JSON.parse("01") is an error. parseFloat("01") is 1.
      // LeetCode examples usually don't have leading zeroes unless it's just "0".
      if (!isNaN(parseFloat(trimmedStr)) && parseFloat(trimmedStr).toString() === trimmedStr) {
        return parseFloat(trimmedStr);
      }
      return JSON.parse(trimmedStr);
    }
  } catch (e) {
    // Fall through to other parsing methods if direct JSON.parse fails
  }

  // Handle key-value pairs like: nums = [1, 2, 3], target = 5
  // This regex approach is more robust for typical LeetCode input formats.
  // e.g. input: nums = [1,2,3], k = 2 or s = "leetcode", wordDict = ["leet","code"]
  if (trimmedStr.includes('=')) {
    const obj: { [key: string]: any } = {};
    // Regex to match key = value pairs, trying to respect brackets and quotes
    // This is a simplified regex and might need refinement for very complex cases
    const regex = /(\w+)\s*=\s*(((?:\[.*?\])|(?:".*?")|(?:\{.*?\})|[^,]+))/g;
    let match;
    let count = 0;
    while ((match = regex.exec(trimmedStr)) !== null) {
      const key = match[1].trim();
      const valStr = match[2].trim();
      obj[key] = parseLeetCodeValueString(valStr); // Recursive call for the value
      count++;
    }
    if (count > 0) return obj; // Return object if key-value pairs were found
  }

  // If it's a string that wasn't quoted but also not a number/boolean/array/object
  // e.g. LeetCode might show `s = abc` instead of `s = "abc"`
  // In such cases, if it's not parsable as anything else, treat as a string.
  // This is a fallback. Most LeetCode examples for strings are properly quoted.
  if (typeof trimmedStr === 'string' && isNaN(Number(trimmedStr)) && trimmedStr !== 'true' && trimmedStr !== 'false') {
      // If the string contains internal quotes or special characters, it should have been caught by JSON.parse earlier.
      // This handles simple unquoted strings.
      return trimmedStr;
  }


  // Final fallback: if it's a number string that wasn't caught by JSON.parse (e.g. due to leading zeros)
  if (!isNaN(parseFloat(trimmedStr))) {
    return parseFloat(trimmedStr);
  }

  // If all else fails, return the original trimmed string.
  return trimmedStr;
}


main().catch(error => {
  console.error('Unhandled error in main execution:', error);
  process.exit(1);
});
