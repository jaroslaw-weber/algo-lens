import ProblemHeader from './ProblemHeader';
import StateDescription from "./ProblemDescription";
import React, { useState, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";

import DisplayState from "./DisplayState";
import CodePreview from "./CodePreview";
import Slider from "./Slider";
import ProblemTabs from "./ProblemTabs"; // Import the new component
import { useAtom } from "jotai";
import { maxStepAtom, problemAtom, problemStateAtom, stepAtom } from "../atom";
import { getProblem, getProblemSize } from "../api";

function ProblemVisualizer() {
  const [activeTab, setActiveTab] = useState("visualizer"); // Keep state here for content rendering
  const [state] = useAtom(problemStateAtom);
  const [problem, setProblem] = useAtom(problemAtom);

  const [step, setStep] = useAtom(stepAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom);

  if (!state || !problem) {
    return null;
  }
  const { title, code, id } = problem;

  const breakpointToLineMap = new Map<number, number>();
  const lines = code!.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const loc = lines[i];
    if (
      loc.trimStart().startsWith("//#") ||
      loc.trimStart().startsWith("// #")
    ) {
      //get number from this line with regex
      const no = new RegExp(/\d+/).exec(loc);
      if (!no) {
        throw new Error("no breakpoints found in code");
      }
      if (no![0]) {
        breakpointToLineMap.set(parseInt(no![0]), i);
      }
    }
  }
  const breakpoint = state.breakpoint;
  const line = breakpointToLineMap.get(breakpoint);

  const handleSliderChange = (value: number) => {
    setStep(value);
  };

  const handleCopyCode = () => {
    copy(code!);
    alert("Code copied to clipboard!");
  };

  useEffect(() => {
    getProblemSize(problem.id!).then((size) => setMaxStep(size));
  }, [problem]);

  return (
    <div className="mx-8 my-8 flex-1">
      <div className="">

        {/* Tab Content Area */}
        <div className="mt-4">
          {/* Visualizer Content Container */}
          {activeTab === "visualizer" && (
            <div className="visualizer-content">
              {/* Moved original content here */}
              <div className="flex flex-col lg:flex-row  lg:gap-20">
                <div className="flex-1 p-2  lg:w-1/2">
                <ProblemHeader title={title} id={id} handleCopyCode={handleCopyCode} />
                  <ProblemTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <StateDescription description={state.description} />
                  <CodePreview code={code} highlightLineIndex={line} />
                </div>
                <div className="lg:pl-6 flex-1 lg:w-1/2  lg:p-2 space-y-4">
                    <Slider
                      min={1}
                      max={maxStep}
                      value={step}
                      onChange={handleSliderChange}
                    />
                    <DisplayState state={state} problem={problem} />
                </div>
              </div>
            </div>
          )}

          {/* Description Content Container */}
          {activeTab === "description" && (
            <div className="description-content">
              {/* Display problem description or fallback */}
              <div className="p-4">
                {problem?.description ? (
                  <p>{problem.description}</p> // Assuming description is plain text
                ) : (
                  <p>No description available.</p>
                )}
              </div>
            </div>
          )}

          {/* Explanation Content Container */}
          {activeTab === "explanation" && (
            <div className="explanation-content p-4">
              {" "}
              {/* Added padding */}
              {
                "No explanation available. (Work in progress)" // Assuming explanation is plain text
              }
            </div>
          )}
        </div>

        {/* Original content block removed from here */}
      </div>
    </div>
  );
}

export default ProblemVisualizer;
