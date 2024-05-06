import React from "react";

const DisplayArray = ({ array, title }) => {
  return (
    <div>
      
      <p className="pl-1 font-display text-xl">{title}</p>
    <div className="join">
      <div className="pt-2 flex overflow-auto py-1 justify-center items-center join">
        {array.map((item, index) => (
          <p
            key={index}
            className="border join-item w-7 h-7 bg-gray-50 text-sm text-center rounded py-0.5"
          >
            {JSON.stringify(item)}
          </p>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DisplayArray;
