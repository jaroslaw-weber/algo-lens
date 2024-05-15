import { Problem, ProblemState, Variable } from "../types";
import { asArray, asSimpleValue, asValueGroup } from "../utils";

function longestIncreasingSubsequence(p: LISInput): ProblemState[] {
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

interface LISInput {
    nums: number[];
}

const code = `function longestIncreasingSubsequence(nums) {
    const dp = new Array(nums.length).fill(1); 
    //#1
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            //#2
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1); 
                //#3
            }
        }
    }
    const result = Math.max(...dp); 
    //#4
    return result;
}`;

const title = "Longest Increasing Subsequence";
const getInput = () => ({ nums: [10, 9, 2, 5, 3, 7, 101, 18] });

export const longestIncreasingSubsequenceProblem: Problem<LISInput, ProblemState> = {
    title: title,
    code: code,
    getInput: getInput,
    func: longestIncreasingSubsequence,
    id: "longest-increasing-subsequence",
    tags: ["dynamic programming"],
};
