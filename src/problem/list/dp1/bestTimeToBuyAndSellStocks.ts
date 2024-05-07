import { Problem, ProblemState, Variable } from "../../Problem";
import { asArr, asNum } from "../../service";

function maxProfit(p: MaxProfitInput): ProblemState[] {
  //save state
  const s: ProblemState[] = [];
  const { prices } = p;
  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];
  //
  s.push({
    variables: [
      asArr("prices", prices),
      asArr("dp", dp),
      ...asNum({ minPrice }),
    ],
    breakpoint: 1,
  });
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    const diff = prices[i] - minPrice;//
    s.push({
      variables: [
        asArr("prices", prices, i),
        asArr("dp", dp, i, i - 1),
        ...asNum({ minPrice, diff,i }),
      ],
      breakpoint:2,
    });
    dp[i] = Math.max(dp[i - 1], diff);//
    s.push({
      variables: [
        asArr("prices", prices, i),
        asArr("dp", dp, i, i - 1),
        ...asNum({ minPrice, diff,i }),
      ],
      breakpoint:3,
    });
    minPrice = Math.min(minPrice, currentPrice);
    //
    s.push({
      variables: [
        asArr("prices", prices, i),
        asArr("dp", dp, i, i - 1),
        ...asNum({ minPrice, diff,i }),
      ],
      breakpoint:4,
    });
  }

  const result = dp[prices.length - 1];
  s.push({ variables:  [
    asArr("prices", prices),
    asArr("dp", dp, prices.length - 1),
    ...asNum({ minPrice,result }),
  ], breakpoint: 5 });

  return s;
}

interface MaxProfitInput {
  prices: number[];
}

const code = `function maxProfit(prices) {
    const dp: number[] = new Array(prices.length).fill(0);
    let minPrice = prices[0];
    //#1
    for (let i = 1; i < prices.length; i++) {
        const diff = prices[i] - minPrice;
        //#2
        dp[i] = Math.max(dp[i - 1], diff);
        //#3
        minPrice = Math.min(minPrice, prices[i]);
        //#4
    }
    
    const result = dp[prices.length - 1];
    //#5
    return result;
}`;

const title = "Best Time to Buy and Sell Stock";
const getInput = () => ({ prices: [7, 1, 5, 3, 6, 4] });
const url = "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/";

export const maxProfitProblem: Problem<MaxProfitInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: maxProfit,
  url,
};
