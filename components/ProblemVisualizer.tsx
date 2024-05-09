import React, { useState } from "react";

import DisplayState from "./DisplayState";
import { Problem } from "../src/problem/types";
import CodePreview from "./CodePreview";

export interface ProblemVisualizerProps<Input, State> {
  problem: Problem<Input, State>;
}

const ProblemVisualizer: React.FC<ProblemVisualizerProps<any, any>> = ({
  problem,
}) => {
  const { title, code, getInput, func, id } = problem;
  const [currentInput, setCurrentInput] = useState(getInput());
  const [currentIndex, setCurrentIndex] = useState(0);

  const breakpointToLineMap = new Map<number, number>();
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const loc = lines[i];
    if (loc.trimStart().startsWith("//#")) {
      //get number from this line with regex
      const no = new RegExp(/\d+/).exec(loc);
      if (no[0]) {
        breakpointToLineMap.set(parseInt(no[0]), i);
      }
    }
  }

  const states = func(currentInput);
  const state = states[currentIndex];
  const breakpoint = state.breakpoint;
  const line = breakpointToLineMap.get(breakpoint);
  console.log("breakpoint", breakpoint);
  console.log("line", line);
  console.log("breakpointToLineMap", breakpointToLineMap);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIndex(parseInt(event.target.value, 10));
  };

  return (
    <div className="card bg-white w-2/3 mx-auto p my-8 min-h-full shadow">
      <div className="card-body">
        <div className="flex items-center gap-6">
          {" "}
          {/* Adjust the gap as needed */}
          <h2 className="font-display text-3xl pl-2">{title}</h2>
          <a
            href={`https://leetcode.com/problems/${id}/description/`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-external-link-alt" aria-hidden="true"></i>
            <span className="sr-only">Go to Leetcode</span>
          </a>
        </div>
        <div className="flex flex-row ">
          <div className="flex-1 p-2  w-1/2">
            <CodePreview code={code} highlightLineIndex={line} />

            <p className="text-xs pt-6 italic">
              use slider to see how the code works
            </p>
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
