import React, { useEffect, useRef } from "react";
import type { Problem, VariableMetadata } from "algo-lens-core";

interface ImportantVariableToRender {
  name: string;
  emoji: string;
  color: string;
}

interface CodePreviewProps {
  code: string;
  highlightLineIndex: number;
  problem?: Problem<any, any>;
}

const CodePreview = ({ code, highlightLineIndex, problem }: CodePreviewProps) => {
  const preRef = useRef(null);

  const processedVariables: ImportantVariableToRender[] = React.useMemo(() => {
    if (problem?.metadata?.variables) {
      return problem.metadata.variables.map((vm: VariableMetadata) => ({
        name: vm.name,
        emoji: vm.emoji, // emoji is mandatory in VariableMetadata
        color: 'text-yellow-500', // Explicitly set default color
      }));
    }
    return [];
  }, [problem]);

  useEffect(() => {
    if (preRef.current) {
      const highlightedLine = preRef.current.querySelector(".highlighted");
      if (highlightedLine) {
        // Smooth scrolling within the <pre> element
        preRef.current.scrollTo({
          top: highlightedLine.offsetTop - preRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [highlightLineIndex]);

  return (
    <div className="overflow-hidden">
      <pre
        ref={preRef}
        className="mockup-code rounded-lg text-xs font-code leading-none overflow-auto"
        style={{ maxHeight: "70vh" }} // Adjust the maxHeight as needed
      >
        {code.split("\n").map((line, lineIndex) => {
          let lineParts: (string | JSX.Element)[] = [line];

          if (processedVariables && processedVariables.length > 0) {
            processedVariables.forEach(variable => {
              // variable.name is guaranteed by ImportantVariableToRender
              const newParts: (string | JSX.Element)[] = [];
              lineParts.forEach((part, partIndex) => {
                if (typeof part === "string" && part.includes(variable.name)) {
                  const regex = new RegExp(`\\b${variable.name}\\b`, 'g');
                  const splitByVar = part.split(regex);
                  
                  splitByVar.forEach((textSegment, i) => {
                    if (textSegment) {
                      newParts.push(textSegment);
                    }
                    if (i < splitByVar.length - 1) {
                      // This is where the variable was
                      newParts.push(
                        <span
                          key={`${variable.name}-${lineIndex}-${partIndex}-${i}`}
                          className={variable.color}
                        >
                          {variable.emoji} {variable.name}
                        </span>
                      );
                    }
                  });
                } else {
                  newParts.push(part);
                }
              });
              lineParts = newParts;
            });
          }

          return (
            <p
              key={lineIndex}
              className={`px-4 py-1 transition-all duration-100 ${
                lineIndex === highlightLineIndex
                  ? "text-primary-content bg-primary highlighted"
                  : ""
              }`}
            >
              {lineParts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>)}
            </p>
          );
        })}
      </pre>
    </div>
  );
};

export default CodePreview;