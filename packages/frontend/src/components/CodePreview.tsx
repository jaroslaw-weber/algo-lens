import React, { useEffect, useRef } from "react";

const CodePreview = ({ code, highlightLineIndex }) => {
  const preRef = useRef(null);

  useEffect(() => {
    if (preRef.current) {
      const highlightedLine = preRef.current.querySelector(".highlighted");
      if (highlightedLine) {
        highlightedLine.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightLineIndex]);

  return (
    <pre
      ref={preRef}
      className="mockup-code rounded-lg text-xs font-code leading-none overflow-auto"
      style={{ maxHeight: "80vh" }} // Adjust the maxHeight as needed
    >
      {code.split("\n").map((line, index) => (
        <p
          key={index}
          className={`px-4 py-2 transition-all duration-100 ${
            index === highlightLineIndex
              ? "text-primary-content bg-primary highlighted"
              : ""
          }`}
        >
          {line}
        </p>
      ))}
    </pre>
  );
};

export default CodePreview;
