import React from "react";
import DisplayArray from "./DisplayArray";
import DisplayNumber from "./DisplayNumber";
import { ArrayVariable, NumberVariable, Variable } from "../src/problem/Problem";

const DisplayState = ({ state }) => {
  const variables = state.variables as Variable[];

  const numbers = [];
  const arrays = [];
  const others = [];

  for (const variable of variables) {
    switch (variable.type) {
      case "number": {
        const data = variable as NumberVariable
        numbers.push(<DisplayNumber data={data} />);
        break;
      }
      case "array": {
        const data = variable as ArrayVariable
        arrays.push(<DisplayArray data={data}  />);
        break;
      }
    }
  }

  return (
    <div className="flex flex-col  h-full items-center justify-center">
      {/* Render numbers in a grid layout */}
      <div className="grid grid-cols-2 gap-4 mb-4 justify-center">
        {numbers}
      </div>

      {/* Render arrays */}
      <div className="mb-4 pt-8 flex flex-col gap-4">{arrays}</div>

      {/* Render other types */}
      {others}
    </div>
  );
};

export default DisplayState;
