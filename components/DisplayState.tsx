import React from "react";
import DisplayArray from "./DisplayArray";
import DisplaySingleValue from "./DisplaySingleValue";
import { ArrayVariable, SimpleVariable, Variable } from "../src/problem/types";

const DisplayState = ({ state }) => {
  const variables = state.variables as Variable[];

  const numbers = [];
  const arrays = [];
  const others = [];

  for (const variable of variables) {
    switch (variable.type) {
      case "number": {
        const data = variable as SimpleVariable
        numbers.push(<DisplaySingleValue data={data}  />);
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
    <div className="flex flex-col  h-full items-center justify-center ">
    {/* Render arrays */}
    <div className="mb-4 pt-8 flex flex-col gap-4">{arrays}</div>
      {/* Render numbers in a grid layout */}
      <div className="grid grid-cols-2 gap-4 mb-4 justify-center grid-animate">
        {numbers}
      </div>


      {/* Render other types */}
      {others}
    </div>
  );
};

export default DisplayState;
