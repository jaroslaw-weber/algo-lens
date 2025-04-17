import React from "react";
import DisplayArray from "./DisplayArray";
import DisplaySingleValue from "./DisplaySingleValue";
import type {
  ArrayVariable,
  ValueGroupVariable,
  SimpleVariable,
  Variable,
  BinaryVariable,
  BooleanGroupVariable,
  IntervalVariable,
  TreeVariable,
  ListVariable,
  HashsetVariable,
  HashmapVariable,
} from "algo-lens-core";
import DisplayValueGroup from "./DisplayValueGroup";
import DisplayBinary from "./DisplayBinary";
import DisplayBooleanGroup from "./DisplayBooleanGroup";
import DisplayIntervals from "./DisplayIntervals";
import DisplayTree from "./DisplayBinaryTree";
import DisplayLinkedList from "./DisplayLinkedList";
import DisplayHashset from "./DisplayHashset";
import DisplayHashmap from "./DisplayHashmap";

function DisplayState({ state }:{state:any}) {
  if (!state) {
    return <div>No state provided</div>;
  }
  const variables = state.variables as Variable[];

  return (
    <div className="lg:flex flex-col min-h-full items-center justify-start">
      <div className="mt-4 flex flex-col gap-8 w-full">
        {variables.map((variable) => {
          switch (variable.type) {
            case "number":
              const numData = variable as SimpleVariable;
              return <DisplaySingleValue data={numData} key={numData.label} />;
            case "array":
              const arrData = variable as ArrayVariable;
              return <DisplayArray data={arrData} key={arrData.label} />;
            case "value-group":
              const groupData = variable as ValueGroupVariable;
              return (
                <DisplayValueGroup data={groupData} key={groupData.label} />
              );
            case "binary":
              const binaryData = variable as BinaryVariable;
              return <DisplayBinary data={binaryData} key={binaryData.label} />;
            case "boolean-group":
              const boolData = variable as BooleanGroupVariable;
              return (
                <DisplayBooleanGroup data={boolData} key={boolData.label} />
              );
            case "interval":
              const intervalData = variable as IntervalVariable;
              return (
                <DisplayIntervals
                  data={intervalData}
                  key={intervalData.label} />
              );
            case "tree":
              const treeData = variable as TreeVariable;
              return <DisplayTree data={treeData} key={treeData.label} />;
            case "hashset":
              const hashsetData = variable as HashsetVariable;
              return (
                <DisplayHashset data={hashsetData} key={hashsetData.label} />
              );
            case "hashmap":
              const hashmapData = variable as HashmapVariable;
              return (
                <DisplayHashmap data={hashmapData} key={hashmapData.label} />
              );
            case "list":
              const listData = variable as ListVariable;
              return <DisplayLinkedList data={listData} key={listData.label} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export default DisplayState;
