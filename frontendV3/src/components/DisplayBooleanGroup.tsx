import React from "react";
import { BooleanGroupVariable } from "../../backend/problem/core/types";

interface DisplayBooleanGroupProps {
  data: BooleanGroupVariable;
}

const DisplayBooleanGroup: React.FC<DisplayBooleanGroupProps> = ({ data }) => {
  const booleanItems = data.data.map((item, index) => (
    <div key={index} className="flex items-center gap-2">
      <span className="text-sm font-medium">{item.label}:</span>
      <input
        type="checkbox"
        checked={item.value}
        disabled
        className="checkbox checkbox-primary"
        style={{
          opacity: 1, // Ensures the checkbox looks the same as enabled
          cursor: 'default', // Changes the cursor to default to prevent interaction
          pointerEvents: 'none', // Prevents clicking on the checkbox
        }}
      />
    </div>
  ));

  return (
    <div className="flex-1">
      <p className="text-left font-bold pb-1">{data.label}</p>
      <div className="w-full grid grid-cols-1 gap-2">{booleanItems}</div>
    </div>
  );
};

export default DisplayBooleanGroup;
