import React from "react";
import DisplayArray from "./DisplayArray";
import DisplayNumber from "./DisplayNumber";

const DisplayState = ({ state }) => {
  const numbers = [];
  const arrays = [];
  const others = [];

  // Classify entries by type
  Object.entries(state).forEach(([key, value]) => {
    if (key === "line") {
      //skip
      return;
    }

    if (typeof value === "number") {
      numbers.push(<DisplayNumber key={key} number={value} title={key} />);
    } else if (Array.isArray(value)) {
      arrays.push(<DisplayArray key={key} array={value} title={key} />);
    } else if (typeof value === "object" && value !== null) {
      others.push(<DisplayState key={key} state={value} />);
    } else {
      others.push(
        <p key={key} className="font-mono text-sm">{`${key}: ${value}`}</p>
      );
    }
  });

  return (
    <div className="flex flex-col  h-full items-center justify-center">
      {/* Render numbers in a grid layout */}
      <div className="grid grid-cols-2 gap-4 mb-4 justify-center">{numbers}</div>

      {/* Render arrays */}
      <div className="mb-4 pt-8">{arrays}</div>

      {/* Render other types */}
      {others}
    </div>
  );
};

export default DisplayState;
