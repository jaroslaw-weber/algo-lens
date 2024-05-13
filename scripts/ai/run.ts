
import { askAi } from "./groq";
import { handleRefactorCode } from "./refactor";
import { handleNewProblem } from "./newProblem";
import { handleAddStateTracking } from "./addBreakpoints";
import { handleAddComments } from "./addComments";

const enquirer = require("enquirer");
const fs = require("fs");

/**
 * Main function to handle the workflow.
 * Presents a user with different coding tasks they can perform.
 */
async function main() {
  const { action } = await enquirer.prompt({
    type: "select",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "Generate new problem",
      "Refactor existing code",
      "Add missing state tracking",
      "Add comments"
    ]
  });

  switch (action) {
    case "Generate new problem":
      await handleNewProblem();
      break;
    case "Refactor existing code":
      await handleRefactorCode();
      break;
    case "Add missing state tracking":
      await handleAddStateTracking();
      break;
    case "Add comments":
      await handleAddComments();
      break;
    default:
      console.log("No valid action selected.");
  }
}






// Entry point for the script
main().catch(console.error);
