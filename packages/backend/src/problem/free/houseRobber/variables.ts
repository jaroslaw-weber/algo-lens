import { VariableMetaData } from "algo-lens-core";

export const variableMetadata: VariableMetaData = {
  nums: { type: "array", label: "Input Houses (nums)" },
  dp: { type: "array", label: "Max Profit DP Array (dp)" },
  i: { type: "simple", label: "Current Index (i)" },
  skipCurrent: { type: "simple", label: "Profit Skipping Current House" },
  twoHousesBefore: { type: "simple", label: "Profit Two Houses Before" },
  currentHouse: { type: "simple", label: "Current House Value" },
  includeCurrent: { type: "simple", label: "Profit Including Current House" },
  result: { type: "simple", label: "Final Max Profit" },
};
