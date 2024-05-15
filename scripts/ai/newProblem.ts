import { extractCode, saveFile } from "./utils";
import { askAi } from "./groq";

const enquirer = require("enquirer");

/**
 * Handles the generation of new problems.
 */
export async function handleNewProblem() {
  // list of example problems that can be used to generate new problems.
  const similarProblemList = ["two-sum", "number-of-1-bits", "container-with-most-water"];
  const { id, requests } = await enquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter the LeetCode question ID:",
    },
    {
      type: "autocomplete",
      name: "similarProblem",
      message: "What is similar problem?",
    }
  ]);

  const q = createPrompt(id);
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
function createPrompt(questionId) {
  return `Generate code for the LeetCode question: ${questionId}, 
  based on the pattern below. 
  Include descriptive comments and tag lines for state tracking. 
  Ensure readability by using clear variable names. 
  Export the main functionality.\n\n`;
}
