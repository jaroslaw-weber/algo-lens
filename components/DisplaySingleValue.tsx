import React, { useEffect, useState } from "react";
import { SimpleVariable } from "../src/problem/types";

const DisplaySingleValue = ({ data }: { data: SimpleVariable }) => {
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

export default DisplaySingleValue;
