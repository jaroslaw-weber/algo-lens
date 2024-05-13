import { extractCode, saveFile } from "./utils";
import { askAi } from "./groq";

const enquirer = require("enquirer");
/**
 * Handles the generation of new problems.
 */
export async function handleNewProblem() {
  const { id, requests } = await enquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter the LeetCode question ID:",
    },
    {
      type: "input",
      name: "requests",
      message: "Any specific requests for the AI?",
    },
  ]);

  const q = createPrompt(id, requests);
  const answer = await askAi(q);
  const code = extractCode(answer);
  const path = `./src/problem/list/${id}.ts`;
  saveFile(code, path);
}
/**
 * Crafts a prompt for the AI using the specified question ID and any additional user requests.
 * @param {string} questionId - The ID of the LeetCode question.
 * @param {string} additionalRequests - Additional customization requests for the AI.
 * @returns {string} A complete prompt ready for AI processing.
 */
function createPrompt(questionId, additionalRequests) {
  return `Generate code for the LeetCode question: ${questionId}, based on the pattern below. ${additionalRequests} Include descriptive comments and tag lines for state tracking. Ensure readability by using clear variable names. Export the main functionality.\n\n`;
}
