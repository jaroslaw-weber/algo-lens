export interface GenerateCodeParams {
  stepsFileContent: string;
  targetFunctionSignature: string; // e.g., "getSum(a: number, b: number): number"
  problemName: string; // Add problem name parameter
}

interface GeneratedCodeOutput {
  content: string;
}

export function generateCodeFromSteps(
  params: GenerateCodeParams
): GeneratedCodeOutput {
  let result = params.stepsFileContent;
  //start with 'l.TEXT' and end with ; (include multiline)
  result = result.replace(/l\.[\s\S]*?;/g, "");
  // Remove extra empty lines (remove if 2 or more empty lines)
  result = result.replace(/(\n\s*){2,}/g, "\n");
  // Remove step logger line
  result = result.replace(/stepLogger\..*?;/g, "");
  // Remove imports
  result = result.replace(/^import[\s\S]*?;?\n/gm, "");

  result = result.replace(/^\s*\/\/.*$\n/gm, "");
  const content = result;
  return { content };
}
