import { extractCode } from "./utils";

const Groq = require("groq-sdk");
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();

/**
 * Groq SDK instance initialized with API key.
 * @type {Groq}
 */
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askAi(prompt) {
  console.log(`Prompt (preview): ${prompt.substring(0, 100)}...`);
  const response = groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama3-70b-8192",
    max_tokens: 2000,
  });
  const content = response.choices[0]?.message?.content;
  return content;
}

export async function askAiForCode(prompt) {
  const answer = await askAi(prompt);
  const code = extractCode(answer);
  return code;
}
