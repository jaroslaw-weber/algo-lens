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
  BinaryOperationVariable,
} from "algo-lens-core";
import DisplayValueGroup from "./DisplayValueGroup";
import DisplayBinary from "./DisplayBinary";
import DisplayBooleanGroup from "./DisplayBooleanGroup";
import DisplayIntervals from "./DisplayIntervals";
import DisplayTree from "./DisplayBinaryTree";
import DisplayLinkedList from "./DisplayLinkedList";
import DisplayHashset from "./DisplayHashset";
import DisplayHashmap from "./DisplayHashmap";
import DisplayBinaryOperation from "./DisplayBinaryOperation";
import { type Problem } from "algo-lens-core";

const Wrapper = ({
  label,
  description,
  emoji,
  children,
  variable,
  className,
}: {
  label: string;
  description?: string;
  emoji?: string;
  children: React.ReactNode;
  variable: Variable;
  className?: string;
}) => (
  <div
    className={`border border-primary shadow rounded-xl p-6 relative ${
      variable.hide ? "opacity-50" : ""
    } ${className || ""}`}
  >
    <div className="absolute -top-3 left-4 bg-white px-2 text-primary-500 font-semibold">
      {emoji} {label} {variable.hide ? "(not in memory)" : ""}
    </div>
    {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
    {children}
  </div>
);

function getWrapperClassName() {
  return "col-span-2 lg:col-span-1";
}

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
      {/* Display the breakpoint description */}
     
      <div className="grid grid-cols-2 gap-8 w-full">
        {variables.map((variable) => {
          const groupMeta = metadata!.groups?.find(
            (x) => x.name === variable.label
          );
          const variableMeta = metadata!.variables.find(
            (meta: any) => meta.name === variable.label
          );

          const meta = variableMeta ?? groupMeta;
          const description = variableMeta?.description ?? groupMeta?.description;
          const emoji = meta?.emoji;

          const className = getWrapperClassName();

          switch (variable.type) {
            case "number":
              const numData = variable as SimpleVariable;
              return (
                <Wrapper
                  className={className}
                  label={numData.label}
                  description={description}
                  emoji={emoji}
                  key={numData.label}
                  variable={variable}
                >
                  <DisplaySingleValue data={numData} />
                </Wrapper>
              );
            case "array":
              const arrData = variable as ArrayVariable;
              return (
                <Wrapper
                  className={className}
                  label={arrData.label}
                  description={description}
                  emoji={emoji}
                  key={arrData.label}
                  variable={variable}
                >
                  <DisplayArray data={arrData} />
                </Wrapper>
              );
            case "value-group":
              const groupData = variable as ValueGroupVariable;
              return (
                <Wrapper
                  className={className}
                  label={groupData.label}
                  description={description}
                  emoji={emoji}
                  key={groupData.label}
                  variable={variable}
                >
                  <DisplayValueGroup data={groupData} variables={metadata!.variables!} />
                </Wrapper>
              );
            case "binary":
              const binaryData = variable as BinaryVariable;
              return (
                <Wrapper
                  className={className}
                  label={binaryData.label}
                  description={description}
                  emoji={emoji}
                  key={binaryData.label}
                  variable={variable}
                >
                  <DisplayBinary data={binaryData} />
                </Wrapper>
              );
            case "boolean-group":
              const boolData = variable as BooleanGroupVariable;
              return (
                <Wrapper
                  className={className}
                  label={boolData.label}
                  description={description}
                  emoji={emoji}
                  key={boolData.label}
                  variable={variable}
                >
                  <DisplayBooleanGroup data={boolData} />
                </Wrapper>
              );
            case "interval":
              const intervalData = variable as IntervalVariable;
              return (
                <Wrapper
                  className={className}
                  label={intervalData.label}
                  description={description}
                  emoji={emoji}
                  key={intervalData.label}
                  variable={variable}
                >
                  <DisplayIntervals data={intervalData} />
                </Wrapper>
              );
            case "tree":
              const treeData = variable as TreeVariable;
              return (
                <Wrapper
                  className={className}
                  label={treeData.label}
                  description={description}
                  emoji={emoji}
                  key={treeData.label}
                  variable={variable}
                >
                  <DisplayTree data={treeData} />
                </Wrapper>
              );
            case "hashset":
              const hashsetData = variable as HashsetVariable;
              return (
                <Wrapper
                  className={className}
                  label={hashsetData.label}
                  description={description }
                  emoji={emoji}
                  key={hashsetData.label}
                  variable={variable}
                >
                  <DisplayHashset data={hashsetData} />
                </Wrapper>
              );
            case "hashmap":
              const hashmapData = variable as HashmapVariable;
              return (
                <Wrapper
                  className={className}
                  label={hashmapData.label}
                  description={description}
                  emoji={emoji}
                  key={hashmapData.label}
                  variable={variable}
                >
                  <DisplayHashmap data={hashmapData} />
                </Wrapper>
              );
            case "list":
              const listData = variable as ListVariable;
              return (
                <Wrapper
                  className={className}
                  label={listData.label}
                  description={description}
                  emoji={emoji}
                  key={listData.label}
                  variable={variable}
                >
                  <DisplayLinkedList data={listData} />
                </Wrapper>
              );
              case "binary-operation":
                const binaryOperationData = variable as BinaryOperationVariable;
                return (
                  <Wrapper
                    className={className}
                    label={binaryOperationData.label}
                    description={description}
                    emoji={emoji}
                    key={binaryOperationData.label}
                    variable={variable}
                  >
                    <DisplayBinaryOperation data={binaryOperationData} />
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
