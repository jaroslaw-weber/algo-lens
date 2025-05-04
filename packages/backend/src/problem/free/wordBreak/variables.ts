import { defineVariable } from "@problem/types/variable";

export const variables = {
  s: defineVariable({
    label: "s",
    description: "The input string 📝",
    type: "string",
    role: "input",
  }),
  wordDict: defineVariable({
    label: "wordDict",
    description: "Dictionary of allowed words 📚",
    type: "string[]", // Assuming array of strings
    role: "input",
  }),
  dp: defineVariable({
    label: "dp",
    description: "Dynamic programming table indicating if substring ending at index i can be segmented 📊",
    type: "boolean[]", // Assuming array of booleans
    role: "local",
  }),
  i: defineVariable({
    label: "i",
    description: "Outer loop index (current end position of substring) ➡️",
    type: "integer",
    role: "local",
  }),
  j: defineVariable({
    label: "j",
    description: "Inner loop index (potential start position of word) ⬅️",
    type: "integer",
    role: "local",
  }),
  substring: defineVariable({
    label: "substring",
    description: "Current substring being checked (s[j...i]) 🔍",
    type: "string",
    role: "local",
  }),
  wordFound: defineVariable({
    label: "wordFound",
    description: "Flag indicating if the current substring is in the dictionary ✅",
    type: "boolean",
    role: "local",
  }),
  result: defineVariable({
    label: "result",
    description: "Final result: Can the string be segmented? 🤔",
    type: "boolean",
    role: "output",
  }),
};
