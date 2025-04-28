import { VariablesGroup } from "algo-lens-core";

export const groups: VariablesGroup[] = [
    {
        id: "1",
        title: "Input Array",
        // Variable name defined in variables.ts/steps.ts (via asNumsArray)
        variables: ["nums"],
    },
    {
        id: "2",
        title: "Search Parameters & Result",
         // Variable names defined in variables.ts/steps.ts (via asTargetAndResult)
        variables: ["target", "result"],
    },
];
