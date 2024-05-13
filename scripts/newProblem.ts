const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const enquirer = require("enquirer");
const fs = require("fs");
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Ensure the API key is stored in your .env file
});

//generate new problem visualization for a given LeetCode question
async function main() {
  const response = await enquirer.prompt({
    type: "input",
    name: "id",
    message:
      "Provide id of leetcode question. For example: https://leetcode.com/problems/house-robber-ii/ will have id: 'house-robber-ii'",
  });

  const response2 = await enquirer.prompt({
    type: "input",
    name: "requests",
    message:
      "Any extra requests for the ai?",
  });

  const { id } = response;
  const { requests } = response2;

  const code = await fs.readFileSync("./src/problem/list/twoSum.ts", "utf-8");

  const aiPrompt = getPrompt(id, code,requests);
  //save prompt to file
  const promptPath = "./prompt.txt";
  fs.writeFileSync(promptPath, aiPrompt);
  //use chat gpt manually

  const path = "./src/problem/list/" + id + ".ts";
  fs.writeFileSync(path, "");
  console.log("Saved completion to " + path);

  const chatCompletion = await askAi(aiPrompt);
  let aiAnswer = chatCompletion.choices[0]?.message?.content || "";
  console.log("ai answer: " + aiAnswer);
  //code will be wrapped in ``` markdown. remove anything before the first ``` and after the last ```
  aiAnswer = aiAnswer.replace("```typescript", "```");
  
  const start = aiAnswer.indexOf("```") + 3;
  const end = aiAnswer.lastIndexOf("```");
  const result = aiAnswer.substring(start, end);

  // Optionally save to a file or just log it
  fs.writeFileSync(path, result);
  console.log("Saved completion to " + path);
}

async function askAi(fullprompt: string) {

  console.log("prompt: " + fullprompt.substring(0, 100) + "...");
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: fullprompt,
      },
    ],
    model: "llama3-70b-8192",
    max_tokens: 2000,
  });
}

main().catch(console.error);
function getPrompt(question: string, code: string, requests: string) {
  return `Generate code for the LeetCode question: ${question}, based on the pattern below. ${requests} Include descriptive comments and tag as many lines as possible with //#number for state tracking. Create variables for the code to make it more readable. Ensure the main variable is exported.\n\n\ ${code}`;
}
