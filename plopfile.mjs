import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function (plop) {
	plop.setGenerator('problem', {
		description: 'Generate files for a new problem',
		prompts: [
			{
				type: 'input',
				name: 'url',
				message: 'What is the problem URL (e.g., https://leetcode.com/problems/two-sum/)?',
			},
		],
		actions: [
			async (data) => {
				const fetch = (await import('node-fetch')).default;
				const cheerio = (await import('cheerio')).default;

				try {
					const response = await fetch(data.url);
					const html = await response.text();
					const $ = cheerio.load(html);

					// Attempt to extract problem title and description (selectors might need adjustment)
					const problemTitle = $('meta[property="og:title"]').attr('content');
					const problemDescription = $('meta[property="og:description"]').attr('content');

					if (problemTitle) {
						data.name = problemTitle.replace(' - LeetCode', '').trim();
					} else {
						// Fallback if og:title is not found - try to find h1
						const h1Title = $('h1').text().trim();
						if (h1Title) {
							data.name = h1Title;
						} else {
							// Fallback to extracting from URL if no title found
							const urlParts = data.url.split('/');
							data.name = urlParts[urlParts.length - 2] || 'new-problem';
						}
					}


					if (problemDescription) {
						data.description = problemDescription;
					} else {
						// Fallback: try to find the description content on the page
						// This selector is a guess and might need adjustment based on LeetCode's structure
						const descriptionElement = $('.problem-statement__content');
						if (descriptionElement.length > 0) {
							data.description = descriptionElement.text().trim();
						} else {
							data.description = 'Problem description could not be scraped.';
						}
					}


					console.log(`Scraped Problem Name: ${data.name}`);
					console.log(`Scraped Problem Description: ${data.description ? data.description.substring(0, 100) + '...' : 'No description'}`);


				} catch (error) {
					console.error('Error fetching or parsing problem URL:', error);
					data.name = 'new-problem'; // Default name on error
					data.description = 'Could not fetch problem description.';
				}

				return 'Problem data fetched and added to context';
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/description.md',
				templateFile: 'plop-templates/description.md.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/groups.ts',
				templateFile: 'plop-templates/groups.ts.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/index.test.ts',
				templateFile: 'plop-templates/index.test.ts.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/problem.ts',
				templateFile: 'plop-templates/problem.ts.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/steps.ts',
				templateFile: 'plop-templates/steps.ts.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/testcase.ts',
				templateFile: 'plop-templates/testcase.ts.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/types.ts',
				templateFile: 'plop-templates/types.ts.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/variables.ts',
				templateFile: 'plop-templates/variables.ts.hbs',
			},
			{
				type: 'add',
				path: 'packages/problem-free/{{kebabCase name}}/code/.gitkeep',
				templateFile: 'plop-templates/code/.gitkeep.hbs',
			},
		],
	});
}