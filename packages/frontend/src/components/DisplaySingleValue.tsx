import React, { useEffect, useState } from "react";
import type { SimpleVariable } from "@algolens/core/src/types";

const DisplaySingleValue = ({ data }: { data: SimpleVariable }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle((current) => !current); // Toggle the state to trigger the animation
  }, [data.value]);

  const animationClass = toggle ? "text-gray-400" : "text-gray-800";

  const renderValue = () => {
    if (typeof data.value === "boolean") {
      return data.value ? "✅" : "❌";
    }
    return data.value;
  };

  return (
    <div
      className={`grid-col-span-1 flex gap-6 justify-end text-right ${animationClass}`}
    >
      <p className="flex-1 text-3xl font-bold">{renderValue()}</p>
    </div>
  );
};

export default DisplaySingleValue;
