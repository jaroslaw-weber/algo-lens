import { Variable } from "algo-lens-core";

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

const isNodeSameVariableTemplate = {
  label: "is node same?",
  type: "boolean-group",
  data: [{ label: "return", value: false }],
};

export const variables: Variable[] = [
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
    ...isNodeSameVariableTemplate,
    name: "is node same?",
    description: "Placeholder description for isNodeSame",
    emoji: "❓",
  },
];
