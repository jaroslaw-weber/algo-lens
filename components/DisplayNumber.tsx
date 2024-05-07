import React from "react";
import { ArrayVariable, NumberVariable } from "../src/problem/Problem";

const DisplayNumber =  ({ data }: { data: NumberVariable }) => {
  return (<div className="stats">
    <div className="stat">
      <div className="stat-title text-sm">{data.label}</div>
      <div className="stat-value text-2xl">{data.value}</div>
    </div></div>
  );
};

export default DisplayNumber;
