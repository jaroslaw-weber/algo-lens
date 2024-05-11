import React from "react";
import DisplayArray from "./DisplayArray";
import DisplaySingleValue from "./DisplaySingleValue";
import { ArrayVariable, ValueGroupVariable, SimpleVariable, Variable } from "../src/problem/types";
import DisplayValueGroup from "./DisplayValueGroup";

const DisplayState = ({ state }) => {
  const variables = state.variables as Variable[];

  const numbers = [];
  const arrays = [];
  const others = [];

  for (const variable of variables) {
    switch (variable.type) {
      case "number": {
        const data = variable as SimpleVariable;
        numbers.push(<DisplaySingleValue data={data} />);
        break;
      }
      case "array": {
        const data = variable as ArrayVariable;
        arrays.push(<DisplayArray data={data} />);
        break;
      }
      case "value-group":{
        const data = variable as ValueGroupVariable;
        others.push(<DisplayValueGroup data={data} />);
        break;
      }
    }
  }

  return (
    <div className="lg:flex flex-col  min-h-full items-center  justify-start">
      {/* Render arrays */}
      <div className="mb-4 pt-8 flex flex-col gap-4">{arrays}</div>
      {/* Render numbers in a grid layout */}
      <div className=" w-full pt-12">{numbers}</div>

      {/* Render other types */}
      <div className="grid grid-cols-2 gap-16 mt-8 w-full">{others}</div>
    </div>
  );
};

export default DisplayState;
