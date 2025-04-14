import React, { useEffect, useState } from "react";
import type { SimpleVariable } from "algo-lens-core";

const DisplaySingleValue = ({ data }: { data: SimpleVariable }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle((current) => !current); // Toggle the state to trigger the animation
  }, [data.value]);

  const animationClass = toggle ? "text-gray-400" : "text-gray-800";

  return (
    <div className="flex gap-6 w-1/3 mx-auto justify-end text-right">
      <p className="flex-1 text-sm text-gray-400">{data.label}</p>
      <p className="flex-1 text-3xl font-bold">{data.value}</p>
    </div>
  );
};

export default DisplaySingleValue;
