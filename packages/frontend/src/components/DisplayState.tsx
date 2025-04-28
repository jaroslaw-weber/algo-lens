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
  VariableMetadata,
} from "algo-lens-core";
import DisplayValueGroup from "./DisplayValueGroup";
import DisplayBinary from "./DisplayBinary";
import DisplayBooleanGroup from "./DisplayBooleanGroup";
import DisplayIntervals from "./DisplayIntervals";
import DisplayTree from "./DisplayBinaryTree";
import DisplayLinkedList from "./DisplayLinkedList";
import DisplayHashset from "./DisplayHashset";
import DisplayHashmap from "./DisplayHashmap";
import { type Problem } from "algo-lens-core";

const Wrapper = ({
  label,
  description,
  emoji,
  children,
}: {
  label: string;
  description?: string;
  emoji?: string;
  children: React.ReactNode;
}) => (
  <div className="border border-primary shadow rounded-xl p-6 relative">
    <div className="absolute -top-3 left-4 bg-white px-2 text-primary-500 font-semibold">
      {emoji} {label}
    </div>
    {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
    {children}
  </div>
);

function DisplayState({
  state,
  problem,
}: {
  state: any;
  problem: Problem<any, any>;
}) {
  if (!state) {
    return <div>No state provided</div>;
  }
  const metadata = problem.metadata;
  const variables = state.variables as Variable[];

  return (
    <div className="lg:flex flex-col min-h-full items-center justify-start">
      <div className="mt-4 flex flex-col gap-8 w-full">
        {variables.map((variable) => {
          const groupMeta = metadata!.groups?.find(
            (x) => x.name === variable.label
          );
          const variableMeta = metadata!.variables.find(
            (meta: any) => meta.name === variable.label
          );

          const meta = variableMeta ?? groupMeta;
          const description = meta?.description;
          const emoji = meta?.emoji;

          switch (variable.type) {
            case "number":
              const numData = variable as SimpleVariable;
              return (
                <Wrapper
                  label={numData.label}
                  description={description}
                  emoji={emoji}
                  key={numData.label}
                >
                  <DisplaySingleValue data={numData} />
                </Wrapper>
              );
            case "array":
              const arrData = variable as ArrayVariable;
              return (
                <Wrapper
                  label={arrData.label}
                  description={description}
                  emoji={emoji}
                  key={arrData.label}
                >
                  <DisplayArray data={arrData} />
                </Wrapper>
              );
            case "value-group":
              const groupData = variable as ValueGroupVariable;
              return (
                <Wrapper
                  label={groupData.label}
                  description={description}
                  emoji={emoji}
                  key={groupData.label}
                >
                  <DisplayValueGroup data={groupData} />
                </Wrapper>
              );
            case "binary":
              const binaryData = variable as BinaryVariable;
              return (
                <Wrapper
                  label={binaryData.label}
                  description={description}
                  emoji={emoji}
                  key={binaryData.label}
                >
                  <DisplayBinary data={binaryData} />
                </Wrapper>
              );
            case "boolean-group":
              const boolData = variable as BooleanGroupVariable;
              return (
                <Wrapper
                  label={boolData.label}
                  description={description}
                  emoji={emoji}
                  key={boolData.label}
                >
                  <DisplayBooleanGroup data={boolData} />
                </Wrapper>
              );
            case "interval":
              const intervalData = variable as IntervalVariable;
              return (
                <Wrapper
                  label={intervalData.label}
                  description={description}
                  emoji={emoji}
                  key={intervalData.label}
                >
                  <DisplayIntervals data={intervalData} />
                </Wrapper>
              );
            case "tree":
              const treeData = variable as TreeVariable;
              return (
                <Wrapper
                  label={treeData.label}
                  description={description}
                  emoji={emoji}
                  key={treeData.label}
                >
                  <DisplayTree data={treeData} />
                </Wrapper>
              );
            case "hashset":
              const hashsetData = variable as HashsetVariable;
              return (
                <Wrapper
                  label={hashsetData.label}
                  description={description}
                  emoji={emoji}
                  key={hashsetData.label}
                >
                  <DisplayHashset data={hashsetData} />
                </Wrapper>
              );
            case "hashmap":
              const hashmapData = variable as HashmapVariable;
              return (
                <Wrapper
                  label={hashmapData.label}
                  description={description}
                  emoji={emoji}
                  key={hashmapData.label}
                >
                  <DisplayHashmap data={hashmapData} />
                </Wrapper>
              );
            case "list":
              const listData = variable as ListVariable;
              return (
                <Wrapper
                  label={listData.label}
                  description={description}
                  emoji={emoji}
                  key={listData.label}
                >
                  <DisplayLinkedList data={listData} />
                </Wrapper>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export default DisplayState;
