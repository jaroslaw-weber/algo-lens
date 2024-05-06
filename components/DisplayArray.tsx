import React from "react";

const DisplayArray = ({ array, title }) => {
  return (
    <div className="p-2 bg-gray-100 rounded">
      <p className="font-bold">{title}:</p>
      <div className="flex overflow-auto py-1">
        {array.map((item, index) => (
          <span
            key={index}
            className="font-mono text-xs mr-2 bg-white p-2 rounded shadow border border-gray-300"
          >
            {JSON.stringify(item)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DisplayArray;
