import { defineVariable } from "@problem/types/variable";

export const variables = {
  a: defineVariable({
    label: "a",
    description: "First input integer 🔢",
    type: "integer",
    role: "input",
  }),
  b: defineVariable({
    label: "b",
    description: "Second input integer 🔢",
    type: "integer",
    role: "input",
  }),
  carry: defineVariable({
    label: "carry",
    description: "Carry bit during addition 🎒",
    type: "bit",
    role: "local",
  }),
  result: defineVariable({
    label: "result",
    description: "Sum of a and b ✨",
    type: "integer",
    role: "output",
  }),
};
