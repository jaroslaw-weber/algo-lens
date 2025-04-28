import { VariablesGroup } from "algo-lens-core";

export const groups: VariablesGroup[] = [
    {
        id: "1",
        title: "Input Trees",
        variables: ["pTree", "qTree"], // Variables defined in variables.ts/steps.ts
    },
    {
        id: "2",
        title: "Comparison Result",
        variables: ["is node same?"], // Boolean group defined in variables.ts/steps.ts
    },
];
