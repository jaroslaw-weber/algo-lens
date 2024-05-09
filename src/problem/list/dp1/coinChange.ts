import { Problem, ProblemState, Variable } from "../../types";
import { asArray, asSimpleValue } from "../../utils";

function coinChange(p: CoinChangeInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { coins, target } = p;
  const coinsVariable = asArray("coins", coins);
  const dp: number[] = new Array(target + 1).fill(Infinity);
  dp[0] = 0; // Base case: no coins needed for amount 0

  s.push({
    variables: [
      coinsVariable,
      asArray("minCoins", dp),
      ...asSimpleValue({ target }),
    ],
    breakpoint: 1,
  }); //#1

  for (let coin of coins) {
    for (let amount = coin; amount <= target; amount++) {
      const dpIndex = amount - coin;
      const coinsWithCurrent = dp[dpIndex] + 1;
      s.push({
        variables: [
          coinsVariable,
          asArray("minCoins", dp, amount, amount - coin),
          ...asSimpleValue({ coin,amount, target, coinsWithCurrent,dpIndex }),
        ],
        breakpoint: 2,
      }); //#
      if (coinsWithCurrent < dp[amount]) {
        dp[amount] = coinsWithCurrent;
        s.push({
          variables: [
            coinsVariable,
            asArray("minCoins", dp, amount, amount - coin),
            ...asSimpleValue({ coin, amount, target, coinsWithCurrent,dpIndex }),
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
  const minCoins = new Array(target + 1).fill(Infinity);
  minCoins[0] = 0; // Base case: no coins needed for amount 0

  //#1 Iterate through each coin denomination available
  for (let coin of coins) {
    // Evaluate every possible amount from this coin's value up to the target amount
    for (let amount = coin; amount <= target; amount++) {
      // Calculate the minimum number of coins needed if this coin is included
      const coinsWithCurrent = minCoins[amount - coin] + 1;
      //#2

      // Update the stored value if the calculated number is fewer than the current minimum
      if (coinsWithCurrent < minCoins[amount]) {
        minCoins[amount] = coinsWithCurrent;

        //#3 Proceed to the next amount to evaluate with this coin
      }
    }
  }

  // Check the minimum coins needed for the target amount; return -1 if it remains Infinity
  const result = minCoins[target] === Infinity ? -1 : minCoins[target];

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
};
