import { Variable, VariableMetadata } from "algo-lens-core";

const pTree = {
  label: "pTree",
  type: "tree",
  value: null,
  highlight: [],
};

const qTree = {
  label: "qTree",
  type: "tree",
  value: null,
  highlight: [],
};

const isNodeSame = {
  label: "is node same?",
  type: "boolean-group",
  data: [{ label: "return", value: false }],
};

const RESULT_METADATA = {
  label: "result",
  type: "boolean",
  value: false,
};

export const variables: VariableMetadata[] = [
  {
    ...pTree,
    name: "pTree",
    description: "Placeholder description for pTree",
    emoji: "🌴",
  },
  {
    ...qTree,
    name: "qTree",
    description: "Placeholder description for qTree",
    emoji: "🌳",
  },
  {
    ...isNodeSame,
    name: "is node same?",
    description: "Placeholder description for isNodeSame",
    emoji: "❓",
  },
  {
    ...RESULT_METADATA,
    name: "Result",
    description:
      "The final result of comparing the two trees (true if identical, false otherwise).",
    emoji: "✅",
  },
];
