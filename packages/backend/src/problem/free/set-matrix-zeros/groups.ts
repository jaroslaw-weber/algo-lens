import { VariablesGroup } from "algo-lens-core";

export const groups: VariablesGroup[] = [
    {
        id: "1",
        title: "Matrix State",
        // Variable name defined in variables.ts/steps.ts (via asMatrix)
        variables: ["matrix"],
    },
    {
        id: "2",
        title: "Zero Flags",
         // Variable name defined in variables.ts/steps.ts (via asFlags)
        variables: ["flags"],
    },
];
