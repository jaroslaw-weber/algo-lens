import React from "react";
import DisplayArray from "./DisplayArray";
import DisplaySingleValue from "./DisplaySingleValue";
import { ArrayVariable, BarChartVariable, SimpleVariable, Variable } from "../src/problem/types";
import DisplayBarChart from "./DisplayBarChart";

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
      case "barchart":{
        const data = variable as BarChartVariable;
        others.push(<DisplayBarChart data={data} />);
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
      <div className="flex flex-col gap-4 mt-8">{others}</div>
    </div>
  );
};

export default DisplayState;
