import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata = {
  nums: {
    label: "Input Array (nums)",
    type: VariableType.array,
  },
  productsLeft: {
    label: "Prefix Products (productsLeft)",
    type: VariableType.array,
  },
  productsRight: {
    label: "Suffix Products (productsRight)",
    type: VariableType.array,
  },
  output: {
    label: "Output Array (output)",
    type: VariableType.array,
  },
};
