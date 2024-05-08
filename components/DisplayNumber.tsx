import React, { useEffect, useState } from "react";
import { NumberVariable } from "../src/problem/Problem";

const DisplayNumber = ({ data }: { data: NumberVariable }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle((current) => !current); // Toggle the state to trigger the animation
  }, [data.value]);

  const animationClass = toggle ? "text-gray-400" : "text-gray-800";

  return (
    <div className="stats flex-1 ">
      <div className="stat">
        <div className="stat-title text-sm">{data.label}</div>
        <div className={`stat-value text-2xl `}>
          <p className={`transition-colors ${animationClass} duration-75 `}>{data.value}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayNumber;
