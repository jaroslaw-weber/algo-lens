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
  //todo: remove extra empty lines (remove if 2 or more empty lines)
  //todo: remove step logger line
  //todo: remove imports

  const content = result;
  return { content };
}
