import { Problem } from "../../Problem";

function longestIncreasingSubsequence(p: LISInput): any[] {
    const steps = [];
    const { nums } = p;
    const dp: number[] = new Array(nums.length).fill(1);
    steps.push({ nums, dp: dp.slice(), line: 1 });

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                steps.push({ i, j, nums, dp: dp.slice(), line: 7 });
            }
        }
    }

    const result = Math.max(...dp);
    steps.push({ nums, dp, result, line: 12 });
    return steps;
}

interface LISState {
    label?: string;
    nums: number[];
    dp: number[];
}

interface LISInput {
    nums: number[];
}

const code = `function longestIncreasingSubsequence(nums) {
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}`;

const title = "Longest Increasing Subsequence";
const getInput = () => ({ nums: [10, 9, 2, 5, 3, 7, 101, 18] });

export const longestIncreasingSubsequenceProblem: Problem<LISInput, LISState> = {
    title: title,
    code: code,
    getInput: getInput,
    func: longestIncreasingSubsequence,
};
