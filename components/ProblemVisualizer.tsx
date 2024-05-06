import React, { useState } from "react";

import DisplayState from "./DisplayState";
interface ProblemVisualizerProps {
  solveFunction: (render: (p: any) => void, input: any) => Promise<any>;
  input: any;
  codeSnippet: string;
  title: string;
}

const ProblemVisualizer: React.FC<ProblemVisualizerProps> = ({
  solveFunction,
  input,
  codeSnippet,
  title,
}) => {
  const [currentInput, setCurrentInput] = useState(input);
  const [result, setResult] = useState<any>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<any>({});

  const handleRun = async () => {
    setRunning(true);
    setError(null);
    try {
      const result = await solveFunction(setState, currentInput);
      setResult(result);
    } catch (err: any) {
      setError(err.message);
    }
    setRunning(false);
  };

  return (
    <div className="flex p-4 bg-gray-50 shadow rounded-lg">
      <div className="flex-initial w-1/2 p-2">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {running ? (
          <p className="text-blue-500">Running...</p>
        ) : (
          <button
            onClick={handleRun}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Run
          </button>
        )}
        <pre className="bg-gray-200 p-3 rounded text-xs">{codeSnippet}</pre>
      </div>
      <div className="flex-auto w-1/2 p-2 space-y-4">
        <DisplayState
          state={{ input: currentInput, output: result, currentState: state }}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ProblemVisualizer;
