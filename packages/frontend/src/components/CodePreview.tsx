import React, { useEffect, useState } from "react";
import { Prism, type SyntaxHighlighterProps } from "react-syntax-highlighter";

interface CodePreviewProps {
  code: string;
  highlightLineIndex: number;
}

const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  highlightLineIndex,
}) => {
  const SyntaxHighlighter =
    Prism as any as typeof React.Component<SyntaxHighlighterProps>;

  const [codeStyle, setStyle] = useState({});
  useEffect(() => {
    import("react-syntax-highlighter/dist/esm/styles/prism/coy").then((mod) =>
      setStyle(mod.default)
    );
  });
  return (
    <div
      className="mockup-code rounded-lg text-xs font-code leading-none overflow-auto"
      style={{ maxHeight: "70vh" }}
    >
      <SyntaxHighlighter
        language="javascript"
        showLineNumbers={true}
        wrapLines={true}
        style={codeStyle}
        customStyle={{
          backgroundColor: "transparent",
        }}
        lineProps={(lineNumber) => {
          const style: React.CSSProperties = { display: "block" };
          if (lineNumber === highlightLineIndex + 1) {
            style.backgroundColor = "oklch(92% 0.12 95.746)"; // Light highlight color
            style.borderRadius = "0.5rem";
          }
          return { style };
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodePreview;
