import React, { useState, useRef, useEffect } from "react";

import DisplayState from "./DisplayState";
import { Problem } from "../src/problem/types";
import CodePreview from "./CodePreview";
import Slider from "./Slider";

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

  const handleSliderChange = (value: number) => {
    setCurrentIndex(value);
  };

  return (
    <div className="card bg-white mx-8 my-8 flex-1 shadow">
      <div className="card-body">
        <div className="flex items-center gap-6">
          {/* Adjust the gap as needed */}
          <h2 className="font-display text-3xl pl-2">{title}</h2>
          <a
            href={`https://leetcode.com/problems/${id}/description/`}
            className="link  tooltip tooltip-right"
            data-tip="Go to Leetcode"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="fas fa-external-link-alt transition-transform duration-300 hover:scale-110"
              aria-hidden="true"
            ></i>
          </a>
        </div>
        <div className="flex flex-col lg:flex-row ">
          <div className="flex-1 p-2  lg:w-1/2">
            <CodePreview code={code} highlightLineIndex={line} />
          </div>
          <div className="lg:pl-6 flex-1 lg:w-1/2  lg:p-2 space-y-4">
            <div className="flex items-center gap-6">
              

              <Slider
                min={0}
                max={states.length - 1}
                value={currentIndex}
                onChange={handleSliderChange}
              />
            </div>
            <div>
              <DisplayState state={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemVisualizer;