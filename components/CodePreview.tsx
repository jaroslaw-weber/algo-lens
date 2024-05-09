import React from 'react';

const CodePreview = ({ code, highlightLineIndex }) => {
  return (
    <pre className="bg-base-100 shadow border rounded-lg p-3 text-xs font-code leading-none overflow-auto">
      {code.split('\n').map((line, index) => (
        <p 
          key={index} 
          className={`px-4 py-2 transition-all duration-100 bg-base-100  ${index === highlightLineIndex ? 'bg-primary scale-110' : ''}`}
        >
          {line}
        </p>
      ))}
    </pre>
  );
};

export default CodePreview;
