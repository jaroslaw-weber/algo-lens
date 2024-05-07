import React from 'react';

const CodePreview = ({ code, highlightLineIndex }) => {
  return (
    <pre className="code bg-base-200 shadow border rounded-lg py-3 font-sm leading-3 overflow-auto">
      {code.split('\n').map((line, index) => (
        <div 
          key={index} 
          className={`px-4 py-2 ${index === highlightLineIndex ? 'bg-primary' : ''}`}
        >
          {line}
        </div>
      ))}
    </pre>
  );
};

export default CodePreview;
