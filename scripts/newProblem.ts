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
    name: "question",
    message: "What LeetCode question do you want to generate code for?",
  });
  const { question } = response as any;
  const response2 = await enquirer.prompt({
    type: "input",
    name: "id",
    message: "What id do you want to use for this problem?",
  });

  const { id } = response2 as any;
  const code = await fs.readFileSync(
    "./src/problem/list/twoSum.ts",
    "utf-8"
  );

  const chatCompletion = await askAi(question, code);
  const aiAnswer = chatCompletion.choices[0]?.message?.content || "";
  console.log("ai answer: " + aiAnswer)

  const path = "./src/problem/list/" + id + ".ts";
  // Optionally save to a file or just log it
  fs.writeFileSync(path, aiAnswer);
  console.log("Saved completion to " + path);
}

async function askAi(question: string, code: string) {
    const fullprompt = `Generate code for the LeetCode question: ${question}, based on the pattern below. Include descriptive comments and tag critical lines with //#number for state tracking. Ensure the main variable is exported.\n\n\ ${code}`;

  console.log("prompt: " + fullprompt.substring(0, 100) + "...");
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: fullprompt,
      },
    ],
    model: "llama3-70b-8192",
    max_tokens: 1000,
  });
}

main().catch(console.error);
