import React from 'react';

const CodePreview = ({ code, highlightLineIndex }) => {
  return (
    <pre className="mockup-code bg-base-100 shadow border rounded-lg p-3 text-xs font-code leading-none overflow-auto">
      {code.split('\n').map((line, index) => (
        <div 
          key={index} 
          className={`px-4 py-2 transition-transform transition-colors duration-100 ${index === highlightLineIndex ? 'bg-primary scale-110' : ''}`}
        >
          {line}
        </div>
      ))}
    </pre>
  );
};

export default CodePreview;
