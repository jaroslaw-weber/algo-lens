import React from "react";
import DisplayArray from "./DisplayArray";
import DisplaySingleValue from "./DisplaySingleValue";
import { ArrayVariable, ValueGroupVariable, SimpleVariable, Variable, BinaryVariable, BooleanGroupVariable, IntervalVariable, TreeVariable, HashsetVariable } from "../src/problem/types";
import DisplayValueGroup from "./DisplayValueGroup";
import DisplayBinary from "./DisplayBinary";
import DisplayBooleanGroup from "./DisplayBooleanGroup";
import DisplayIntervals from "./DisplayIntervals";
import DisplayTree from "./DisplayBinaryTree";
import DisplayHashset from "./DisplayHashset";

const DisplayState = ({ state }) => {
  const variables = state.variables as Variable[];

  const numbers = [];
  const arrays = [];
  const others = [];
  const binary = [];
  const booleans = []; // Added for boolean groups
  const intervals = []; // Added for intervals

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
      case "interval": {
        const data = variable as IntervalVariable;
        intervals.push(<DisplayIntervals data={data} key={data.label} />);
        break;
      }
      case "tree":{
        const data = variable as TreeVariable;
        arrays.push(<DisplayTree data={data} key={data.label} />);
        break;
      }
      case "hashset": {
        const data = variable as HashsetVariable;
        others.push(<DisplayHashset data={data} key={data.label} />);
        break;
      }
    }
  }

  return (
    <div className="lg:flex flex-col min-h-full items-center justify-start">
    <div className="grid grid-cols-1 gap-16 mt-4 w-full">{intervals}</div>
      <div className="grid grid-cols-2 gap-16 mt-4 w-full">{binary}</div>
      {/* Render numbers in a grid layout */}
      <div className="w-full mt-4">{numbers}</div>
      {/* Render arrays */}
      <div className="mt-4 flex flex-col gap-4">{arrays}</div>
      {/* Render boolean groups */}
      <div className="grid grid-cols-2 gap-16 mt-4 w-full">{booleans}</div>
      {/* Render other types */}
      <div className="grid grid-cols-2 gap-16 mt-4 w-full">{others}</div>
    </div>
  );
};

export default DisplayState;
