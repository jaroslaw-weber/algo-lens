import { ProblemState } from "algo-lens-core"; // Removed Problem, Variable
import { asArray, asSimpleValue, asValueGroup } from "../../core/utils";
import { LISInput } from "./types"; // Import LISInput

export function generateSteps(p: LISInput): ProblemState[] { // Renamed and Exported
    const s: ProblemState[] = [];
    const { nums } = p;
    const dp: number[] = new Array(nums.length).fill(1);
    s.push({
        variables: [
            asArray("dp", dp),
            asArray("nums", nums),
        ],
        breakpoint: 1,
    }); //#1

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            s.push({
            variables: [
                asArray("dp", dp),
                asArray("nums", nums, i, j),
                asValueGroup("loops", { i, j }, { min: 0, max: nums.length }),
            ],
            breakpoint: 2,
        }); //#2
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                s.push({
                    variables: [
                        asArray("dp", dp, i,j),
                        asArray("nums", nums, i, j),
                        asValueGroup("loops", { i, j }, { min: 0, max: nums.length }),
                    ],
                    breakpoint: 3,
                }); //#3
            }
        }
    }

    const result = Math.max(...dp);
    s.push({
        variables: [
            asArray("dp", dp),
            asArray("nums", nums),
            ...asSimpleValue({ result }),
        ],
        breakpoint:4,
    }); //#4
    return s;
}

// Removed LISInput interface, code, title, getInput, Problem export
