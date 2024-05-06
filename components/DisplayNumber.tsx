import React from "react";

const DisplayNumber = ({ number, title }) => {
  return (
    <div className="p-2 bg-gray-100 rounded">
      <p className="font-bold">{title}:</p>
      <div className="bg-white p-2 rounded shadow border border-gray-300">
        <span className="font-mono text-xs">{number}</span>
      </div>
    </div>
  );
};

export default DisplayNumber;
