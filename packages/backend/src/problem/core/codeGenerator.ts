interface GenerateCodeParams {
  stepsFileContent: string;
  targetFunctionSignature: string; // e.g., "getSum(a: number, b: number): number"
}

interface GeneratedCodeOutput {
  fileName: string; // Suggested: "typescript.ts" for now
  content: string;
  logs: string[];
}

export function generateCodeFromSteps(params: GenerateCodeParams): GeneratedCodeOutput {
  const logs: string[] = [];
  const { stepsFileContent, targetFunctionSignature } = params; // Removed returnVariable
  const lines = stepsFileContent.split('\\n');
  const generatedLines: string[] = [];

  let loggerVariableName: string | null = null;

  // Try to find logger variable name
  const loggerInitRegex = /const\s+([a-zA-Z0-9_]+)\s*=\s*new\s+(StepLoggerV2|StepLogger)\(\s*\);/;
  for (const line of lines) {
    const match = line.match(loggerInitRegex);
    if (match && match[1]) {
      loggerVariableName = match[1];
      logs.push(`Logger variable identified: '${loggerVariableName}'.`);
      break;
    }
  }

  if (!loggerVariableName) {
    logs.push("Warning: Logger variable initialization not found. Assuming 'l' if other logger patterns are matched.");
    // Attempt to find logger calls even if init is not standard, default to 'l' or make it more robust
    // For now, we will proceed and hope specific logger calls are caught, or use a common default.
    // A more robust solution might be needed if logger init patterns vary widely.
    // We will rely on the logger method call regex to catch calls even if 'l' is not confirmed.
  }

  const loggerMethodRegex = loggerVariableName 
    ? new RegExp(`^\\s*${loggerVariableName}\\.(binary|breakpoint|log|getSteps)\\(.*\\);?`) 
    : new RegExp(`^\\s*[a-zA-Z0-9_]+\\.(binary|breakpoint|log|getSteps)\\(.*\\);?`); // Fallback regex if name not found

  for (const line of lines) {
    // 1. Filter import lines
    if (line.match(/import\s+.*\s+from\s+['"]algo-lens-core['"];/) || line.match(/import\s+{.*(StepLoggerV2|StepLogger).*}\s+from\s+['"].*['"];/)) {
      logs.push(`Removed import line: ${line}`);
      continue;
    }

    // 2. Replace function signature
    if (line.match(/export\s+function\s+generateSteps\s*\(/)) {
      const updatedSignature = `export function ${targetFunctionSignature} {`;
      generatedLines.push(updatedSignature);
      logs.push(`Replaced function signature: '${line}' with '${updatedSignature}'`);
      continue;
    }

    // 3. Filter out logger initialization line (already processed for name, so just remove)
    if (line.match(loggerInitRegex)) {
      logs.push(`Removed logger initialization line: ${line}`);
      continue;
    }

    // 4. Filter out logger method calls
    // If loggerVariableName was found, the regex is more specific.
    // If not, a generic one tries to catch calls like `l.binary(...)` or `anyVar.binary(...)`
    const loggerCallMatch = loggerVariableName 
        ? line.match(new RegExp(`^\\s*${loggerVariableName}\\.(binary|breakpoint|log)\\(.*\\);?`))
        : line.match(/^\s*[a-zA-Z0-9_]+\.(binary|breakpoint|log)\(.*\);?/);

    if (loggerCallMatch) {
      logs.push(`Removed logger method call: ${line}`);
      continue;
    }

    // 5. Replace return l.getSteps()
    const returnLoggerStepsRegex = loggerVariableName
      ? new RegExp(`^\\s*return\\s+${loggerVariableName}\\.getSteps\\(\\s*\\);`)
      : /^\s*return\s+[a-zA-Z0-9_]+\.getSteps\(\s*\);/;
      
    if (line.match(returnLoggerStepsRegex)) {
      const returnLine = `  return result;`; // Hardcoded to "result"
      generatedLines.push(returnLine);
      logs.push(`Replaced return line: '${line}' with '${returnLine}'`);
      continue;
    }

    // Keep other lines
    generatedLines.push(line);
  }

  return {
    fileName: "typescript.ts",
    content: generatedLines.join('\\n'),
    logs,
  };
}
