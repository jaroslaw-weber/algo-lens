import { Problem, ProblemState, Variable } from "../../types";
import { asArray, asSimpleValue } from "../../utils";

function minCoins(p: CoinChangeInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { coins, amount } = p;
  const coinsVariable = asArray("coins", coins)
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  s.push({
    variables: [
        coinsVariable,
      asArray("dp", dp),
      ...asSimpleValue({ amount }),
    ],
    breakpoint: 1,
  }); //#1

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      if (dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        s.push({
          variables: [
            coinsVariable,
            asArray("dp", dp, i, i - coin),
            ...asSimpleValue({ coin, i, amount }),
          ],
          breakpoint: 2,
        }); //#2
      }
    }
  }

  const result = dp[amount] === Infinity ? -1 : dp[amount];
  s.push({
    variables: [
        coinsVariable,
      asArray("dp", dp, amount),
      ...asSimpleValue({ result,amount }),
    ],
    breakpoint: 3,
  }); //#3
  return s;
}

interface CoinChangeInput {
  coins: number[];
  amount: number;
}

const code = `function minCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; 
  //#1
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      if (dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1; 
        //#2
      }
    }
  }
  const result = dp[amount] === Infinity ? -1 : dp[amount]; 
  //#3
  return result;
}`;

const title = "Coin Change";
const getInput = () => ({ coins: [1, 2, 5], amount: 11 });
export const coinChangeProblem: Problem<CoinChangeInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: minCoins,
};
