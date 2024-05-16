import React from "react";
import DisplayArray from "./DisplayArray";
import DisplaySingleValue from "./DisplaySingleValue";
import { ArrayVariable, ValueGroupVariable, SimpleVariable, Variable, BinaryVariable, BooleanGroupVariable } from "../src/problem/types";
import DisplayValueGroup from "./DisplayValueGroup";
import DisplayBinary from "./DisplayBinary";
import DisplayBooleanGroup from "./DisplayBooleanGroup";

const DisplayState = ({ state }) => {
  const variables = state.variables as Variable[];

  const numbers = [];
  const arrays = [];
  const others = [];
  const binary = [];
  const booleans = []; // Added for boolean groups

  for (const variable of variables) {
    switch (variable.type) {
      case "number": {
        const data = variable as SimpleVariable;
        numbers.push(<DisplaySingleValue data={data} key={data.label} />);
        break;
      }
      case "array": {
        const data = variable as ArrayVariable;
        arrays.push(<DisplayArray data={data} key={data.label} />);
        break;
      }
      case "value-group": {
        const data = variable as ValueGroupVariable;
        others.push(<DisplayValueGroup data={data} key={data.label} />);
        break;
      }
      case "binary": {
        const data = variable as BinaryVariable;
        binary.push(<DisplayBinary data={data} key={data.label} />);
        break;
      }
      case "boolean-group": { // New case for boolean groups
        const data = variable as BooleanGroupVariable;
        booleans.push(<DisplayBooleanGroup data={data} key={data.label} />);
        break;
      }
    }
  }

  return (
    <div className="lg:flex flex-col min-h-full items-center justify-start">
      <div className="grid grid-cols-2 gap-16 mt-8 w-full">{binary}</div>
      {/* Render numbers in a grid layout */}
      <div className="w-full pt-12">{numbers}</div>
      {/* Render arrays */}
      <div className="mb-4 pt-8 flex flex-col gap-4">{arrays}</div>
      {/* Render boolean groups */}
      <div className="grid grid-cols-2 gap-16 mt-8 w-full">{booleans}</div>
      {/* Render other types */}
      <div className="grid grid-cols-2 gap-16 mt-8 w-full">{others}</div>
    </div>
  );
};

export default DisplayState;
