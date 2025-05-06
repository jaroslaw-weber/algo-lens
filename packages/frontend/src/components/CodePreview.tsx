import React, { useEffect, useRef } from "react";

const CodePreview = ({ code, highlightLineIndex }) => {
  const preRef = useRef(null);

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
        style={{ maxHeight: "60vh" }} // Adjust the maxHeight as needed
      >
        {code.split("\n").map((line, index) => (
          <p
            key={index}
            className={`px-2 py-0.5 transition-all duration-100 ${
              index === highlightLineIndex
                ? "text-primary-content bg-primary highlighted"
                : ""
            }`}
          >
            {line}
          </p>
        ))}
      </pre>
    </div>
  );
};

export default CodePreview;