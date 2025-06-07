import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
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
  isMinimized,
  onToggleMinimize,
}: {
  label: string;
  description?: string;
  emoji?: string;
  children: React.ReactNode;
  variable: Variable & {
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    isFirst?: boolean;
    isLast?: boolean;
  };
  className?: string;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}) => (
  <div
    className={`border border-primary shadow rounded-xl relative ${
      variable.hide ? "opacity-50" : ""
    } ${className || ""} ${isMinimized ? "p-2" : "p-6"}`}
  >
    <div className="absolute -top-3 left-4 right-4  px-2 text-primary-500 font-semibold flex items-center justify-between">
      <div className="flex items-center bg-white px-3">
        {emoji} {label} {variable.hide ? "(not in memory)" : ""}
      </div>
      {/* Move Up/Down buttons */}
      <span className="flex gap-3 bg-white px-3">
        <button
          onClick={onToggleMinimize}
          className="ml-2 text-gray-500 hover:text-gray-700"
          aria-label={isMinimized ? "Expand" : "Minimize"}
        >
          {isMinimized ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
        <button
          type="button"
          className="text-xs px-1 py-0.5 rounded hover:bg-gray-200"
          onClick={variable.onMoveUp}
          aria-label="Move Up"
          disabled={variable.isFirst}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          type="button"
          className="text-xs px-1 py-0 rounded hover:bg-gray-200"
          onClick={variable.onMoveDown}
          aria-label="Move Down"
          disabled={variable.isLast}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </span>
    </div>
    {description && !isMinimized && (
      <p className="text-xs text-gray-500 mb-2">{description}</p>
    )}
    {!isMinimized && children}
  </div>
);

function getWrapperClassName() {
  return "col-span-2 lg:col-span-1";
}

import { useState } from "react";

function DisplayState({
  state,
  problem,
}: {
  state: any;
  problem: Problem<any, any>;
}) {
  const [minimizedState, setMinimizedState] = useState<Record<string, boolean>>(
    {}
  );
  const [order, setOrder] = useState<string[]>(() =>
    (state?.variables as Variable[]).map((v) => v.label)
  );

  const handleToggleMinimize = (label: string) => {
    setMinimizedState((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const handleMove = (label: string, direction: "up" | "down") => {
    setOrder((prevOrder) => {
      const idx = prevOrder.indexOf(label);
      if (idx === -1) return prevOrder;
      const newOrder = [...prevOrder];
      if (direction === "up" && idx > 0) {
        [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
      }
      if (direction === "down" && idx < newOrder.length - 1) {
        [newOrder[idx + 1], newOrder[idx]] = [newOrder[idx], newOrder[idx + 1]];
      }
      return newOrder;
    });
  };

  if (!state) {
    return <div>No state provided</div>;
  }
  const metadata = problem.metadata;
  const variables = state.variables as Variable[];

  // Map label to variable for fast lookup
  const variableMap: Record<string, Variable> = {};
  variables.forEach((v) => {
    variableMap[v.label] = v;
  });

  return (
    <div className="lg:flex flex-col min-h-full items-center justify-start">
      {/* Display the breakpoint description */}

      <div className="grid grid-cols-2 gap-8 w-full">
        {order.map((label, idx) => {
          const variable = variableMap[label];
          if (!variable) return null;
          const groupMeta = metadata!.groups?.find(
            (x) => x.name === variable.label
          );
          const variableMeta = metadata!.variables.find(
            (meta: any) => meta.name === variable.label
          );

          const meta = variableMeta ?? groupMeta;
          const description =
            variableMeta?.description ?? groupMeta?.description;
          const emoji = meta?.emoji;

          const className = getWrapperClassName();
          const isMinimized = minimizedState[variable.label] || false;

          // Add move up/down handlers and flags
          const isFirst = idx === 0;
          const isLast = idx === order.length - 1;
          const moveProps = {
            onMoveUp: () => handleMove(variable.label, "up"),
            onMoveDown: () => handleMove(variable.label, "down"),
            isFirst,
            isLast,
          };

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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() => handleToggleMinimize(numData.label)}
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() => handleToggleMinimize(arrData.label)}
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() => handleToggleMinimize(groupData.label)}
                >
                  <DisplayValueGroup
                    data={groupData}
                    variables={metadata!.variables!}
                  />
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() =>
                    handleToggleMinimize(binaryData.label)
                  }
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() => handleToggleMinimize(boolData.label)}
                >
                  <DisplayBooleanGroup data={boolData} />
                </Wrapper>
              );
            case "interval":
            case "labeled-interval":
              const intervalData = variable as IntervalVariable;
              return (
                <Wrapper
                  className={className}
                  label={intervalData.label}
                  description={description}
                  emoji={emoji}
                  key={intervalData.label}
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() =>
                    handleToggleMinimize(intervalData.label)
                  }
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() => handleToggleMinimize(treeData.label)}
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
                  description={description}
                  emoji={emoji}
                  key={hashsetData.label}
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() =>
                    handleToggleMinimize(hashsetData.label)
                  }
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() =>
                    handleToggleMinimize(hashmapData.label)
                  }
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() => handleToggleMinimize(listData.label)}
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
                  variable={{ ...variable, ...moveProps }}
                  isMinimized={isMinimized}
                  onToggleMinimize={() =>
                    handleToggleMinimize(binaryOperationData.label)
                  }
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
