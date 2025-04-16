import { Problem, ProblemState, Variable } from "algo-lens-core"
import { asArray, asValueGroup, asSimpleValue } from "algo-lens-core/src/utils";

function coinChange(p: CoinChangeInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { coins, target } = p;
  const coinsVariable = asArray("coins", coins);
  const dp: number[] = new Array(target + 1).fill(Infinity);
  dp[0] = 0; // Base case: no coins needed for amount 0

  s.push({
    variables: [
      coinsVariable,
      asArray("dp", dp),
      ...asSimpleValue({ target }),
    ],
    breakpoint: 1,
  }); //#1

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    for (let amount = coin; amount <= target; amount++) {
      const left = amount - coin;
      const include = dp[left] + 1;
      const exclude = dp[amount];
      const barChart = asValueGroup(
        "include coin?",
        { include, exclude },
        { min: 0, max: target }
      );
      s.push({
        variables: [
          ...asSimpleValue({ target }),
          asArray("coins", coins, i),
          asArray("dp", dp, amount, amount - coin),
          barChart,
          asValueGroup("difference (amount - coin)", { amount,coin, left }, { min: 0, max: target }),
        ],
        breakpoint: 2,
      }); //#

      if (include < exclude) {
        dp[amount] = include;
        s.push({
          variables: [
            ...asSimpleValue({ target }),
            asArray("coins", coins, i),
            asArray("dp", dp, amount, amount - coin),
           
            barChart,
            asValueGroup("difference (amount - coin)", { amount,coin, left}, { min: 0, max: target }),
          ],
          breakpoint: 3,
        }); //#2
      }
    }
  }

  const result = dp[target] === Infinity ? -1 : dp[target];
  s.push({
    variables: [
      coinsVariable,
      asArray("minCoins", dp, target),
      ...asSimpleValue({ result, target }),
    ],
    breakpoint: 3,
  }); //#3
  return s;
}

interface CoinChangeInput {
  coins: number[];
  target: number;
}
const code = `function coinChange(coins, target) {
  // Create an array to store the minimum number of coins required for each amount up to the target
  const dp = new Array(target + 1).fill(Infinity);
  dp[0] = 0; // Base case: no coins needed for amount 0

  //#1 Iterate through each coin denomination available
  for (let coin of coins) {
    // Evaluate every possible amount from this coin's value up to the target amount
    for (let amount = coin; amount <= target; amount++) {
      // Calculate the minimum number of coins needed if this coin is included
      const left = amount - coin
      const include = dp[left] + 1;
      const exclude = dp[amount];
      //#2

      // Update the stored value if the calculated number is fewer than the current minimum
      if (include < exclude) {
        dp[amount] = include;

        //#3 Proceed to the next amount to evaluate with this coin
      }
    }
  }

  // Check the minimum coins needed for the target amount; return -1 if it remains Infinity
  const result = dp[target] === Infinity ? -1 : dp[target];

  //#4 Return the final calculated result
  return result;
}`;

const title = "Coin Change";
const getInput = () => ({ coins: [1, 2, 5], target: 11 });
export const coinChangeProblem: Problem<CoinChangeInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: coinChange,
  id: "coin-change",
  tested: true,
  tags: ["dynamic programming"]
};
