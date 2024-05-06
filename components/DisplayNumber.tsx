import React from "react";

const DisplayNumber = ({ number, title }) => {
  return (<div className="stats bg-blue-50 shadow-inner w-24">
    <div className="stat">
      <div className="stat-title text-sm">{title}</div>
      <div className="stat-value text-2xl">{number}</div>
    </div></div>
  );
};

export default DisplayNumber;
