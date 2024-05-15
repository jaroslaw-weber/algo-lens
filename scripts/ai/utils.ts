
const fs = require("fs");
/**
 * Extracts and returns the formatted code from the AI's response.
 */
export function extractCode(answer) {
  const start = answer.indexOf("```") + 3;
  const end = answer.lastIndexOf("```");
  return answer.substring(start, end);
}


export function saveFile(content:string, path:string) {
	
	fs.writeFileSync(path, content);
	console.log(`Saved content to ${path}`);
}