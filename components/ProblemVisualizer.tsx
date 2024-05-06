import React, { useState } from "react";

import DisplayState from "./DisplayState";
import { Problem } from "../problems/Problem";
import CodePreview from "./CodePreview";

export interface ProblemVisualizerProps<Input, State> {
  problem: Problem<Input, State>;
}

const ProblemVisualizer: React.FC<ProblemVisualizerProps<any, any>> = ({
  problem,
}) => {
  const { title, code, getInput, func } = problem;
  const [currentInput, setCurrentInput] = useState(getInput());
  const [currentIndex, setCurrentIndex] = useState(0);

  const states = func(currentInput);
  const state = states[currentIndex];

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIndex(parseInt(event.target.value, 10));
  };

  return (
    <div className="card bg-white w-2/3 mx-auto p my-8 min-h-full shadow">
      <div className="card-body">
        <h2 className="font-display text-3xl pl-2">{title}</h2>
        <div className="flex flex-row">
          <div className="flex-1 p-2  w-1/2">
            <CodePreview
              code={code}
              highlightLineIndex={states[currentIndex].line}
            />
            
            <p className="text-sm pt-6 italic">use slider to see how the code works</p>
            <input
              type="range"
              min="0"
              max={states.length - 1}
              value={currentIndex}
              onChange={handleSliderChange}
              className="range range-primary mt-4"
            />
          </div>
          <div className="flex-1 w-1/2  p-2 space-y-4">
            <DisplayState state={state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemVisualizer;
