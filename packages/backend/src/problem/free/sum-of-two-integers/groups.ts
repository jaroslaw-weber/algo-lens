import { VariablesGroup } from "algo-lens-core";

export const groups: VariablesGroup[] = [
    {
        id: "1",
        title: "Operands & Result",
        // Variable names defined in variables.ts/steps.ts (via asBinary)
        variables: ["a", "b"],
    },
    {
        id: "2",
        title: "Carry",
         // Variable name defined in variables.ts/steps.ts (via asBinary)
        variables: ["carry"],
    },
];
