import React from 'react';

const CodePreview = ({ code, highlightLineIndex }) => {
  return (
    <pre className="code bg-gray-50 shadow-inner rounded-lg py-3 font-sm leading-3 overflow-auto">
      {code.split('\n').map((line, index) => (
        <div 
          key={index} 
          className={`px-4 py-2 ${index === highlightLineIndex ? 'bg-blue-100' : ''}`}
        >
          {line}
        </div>
      ))}
    </pre>
  );
};

export default CodePreview;
