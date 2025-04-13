import React from 'react';

const CodePreview = ({ code, highlightLineIndex }) => {
  return (
    <pre className="mockup-code rounded-lg text-xs font-code leading-none overflow-auto">
      {code.split('\n').map((line, index) => (
        <p 
          key={index} 
          className={`px-4 py-2 transition-all duration-100 ${index === highlightLineIndex ? 'text-primary-content bg-primary ' : ''}`}
        >
          {line}
        </p>
      ))}
    </pre>
  );
};

export default CodePreview;
