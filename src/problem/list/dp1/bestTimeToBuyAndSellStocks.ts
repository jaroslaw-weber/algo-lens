import { Problem, ProblemState, Variable } from "../../types";
import { asArray, asSimpleValue } from "../../utils";

function maxProfit(p: MaxProfitInput): ProblemState[] {
  //save state
  const s: ProblemState[] = [];
  const { prices } = p;
  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];
  //
  s.push({
    variables: [
      asArray("prices", prices),
      asArray("dp", dp),
      ...asSimpleValue({ minPrice }),
    ],
    breakpoint: 1,
  });
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    const diff = prices[i] - minPrice;//
    s.push({
      variables: [
        asArray("prices", prices, i),
        asArray("dp", dp, i, i - 1),
        ...asSimpleValue({ minPrice, diff,i }),
      ],
      breakpoint:2,
    });
    dp[i] = Math.max(dp[i - 1], diff);//
    s.push({
      variables: [
        asArray("prices", prices, i),
        asArray("dp", dp, i, i - 1),
        ...asSimpleValue({ minPrice, diff,i }),
      ],
      breakpoint:3,
    });
    minPrice = Math.min(minPrice, currentPrice);
    //
    s.push({
      variables: [
        asArray("prices", prices, i),
        asArray("dp", dp, i, i - 1),
        ...asSimpleValue({ minPrice, diff,i }),
      ],
      breakpoint:4,
    });
  }

  const result = dp[prices.length - 1];
  s.push({ variables:  [
    asArray("prices", prices),
    asArray("dp", dp, prices.length - 1),
    ...asSimpleValue({ minPrice,result }),
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
        const price = prices[i]
        const diff = price - minPrice;
        const prev = dp[i - 1];
        //#2
        dp[i] = Math.max(prev, diff);
        //#3
        minPrice = Math.min(minPrice, price);
        //#4
    }
    
    const result = dp[prices.length - 1];
    //#5
    return result;
}`;

const title = "Best Time to Buy and Sell Stock";
const getInput = () => ({ prices: [7, 1, 5, 3, 6, 4] });

export const maxProfitProblem: Problem<MaxProfitInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: maxProfit,
  tested:true,
  id:"best-time-to-buy-and-sell-stock",
};
