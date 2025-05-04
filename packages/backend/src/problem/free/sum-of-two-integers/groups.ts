import { defineGroup } from "@problem/types/group";
import { variables } from "./variables";

export const groups = {
  input: defineGroup({
    label: "Input Operands",
    description: "The two integers to be added.",
    variables: [variables.a, variables.b],
  }),
  calculation: defineGroup({
    label: "Calculation State",
    description: "Intermediate values used during the bitwise addition.",
    variables: [variables.carry],
  }),
  output: defineGroup({
    label: "Result",
    description: "The final sum.",
    variables: [variables.result],
  }),
};
