import { Problem } from "../../Problem";

function minCoins(p: CoinChangeInput): any[] {
    const steps = [];
    const { coins, amount } = p;
    const dp: number[] = new Array(amount + 1).fill(null);
    dp[0] = 0;
    steps.push({ amount, dp: dp.slice(), line: 1 });

    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            steps.push({ coin, i, dp: dp.slice(), line: 7 });
        }
    }

    const result = dp[amount] === null ? -1 : dp[amount];
    steps.push({ amount, dp, result, line: 12 });
    return steps;
}

interface CoinChangeState {
    label?: string;
    coins: number[];
    dp: number[];
    amount: number;
}

interface CoinChangeInput {
    coins: number[];
    amount: number;
}

const code = `function minCoins(coins, amount) {
    const dp = new Array(amount + 1).fill(null);
    dp[0] = 0;
    
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] === null ? -1 : dp[amount];
}`;

const title = "Coin Change";
const getInput = () => ({ coins: [1, 2, 3], amount: 7 });

export const coinChangeProblem: Problem<CoinChangeInput, CoinChangeState> = {
    title: title,
    code: code,
    getInput: getInput,
    func: minCoins,
};
