import { Problem, ProblemState, VariableMetadata } from "algo-lens-core";
import { asArray, asSimpleValue, asValueGroup } from "../core/utils";

//// Define a constant object for variable descriptions
const variableMetadata: VariableMetadata[] = [
  {
    name: "prices",
    description:
      "The stock prices for each day. You're choosing the best day to buy and sell.",
    emoji: "📈",
  },
  {
    name: "dp",
    description: "The maximum profit you could have made up to that day.",
    emoji: "💰",
  },
  {
    name: "price",
    description: "The current day's price being considered (prices[i]).",
    emoji: "💵",
  },
  {
    name: "minPrice",
    description: "The lowest price seen so far — you 'buy' at this price.",
    emoji: "🏦",
  },
  {
    name: "diff",
    description:
      "The possible profit if you bought at minPrice and sold today (price - minPrice).",
    emoji: "🔍",
  },
  {
    name: "prev",
    description: "The best profit found until the previous day (dp[i - 1]).",
    emoji: "📊",
  },
  { name: "i", description: "The current step/day in the loop.", emoji: "🔄" },
];

function maxProfit(p: MaxProfitInput): ProblemState[] {
  //save state
  const s: ProblemState[] = [];
  const { prices } = p;
  const maxPrice = Math.max(...prices);
  const priceGroupOptions = { min: 0, max: maxPrice };
  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];
  //
  s.push({
    variables: [
      asArray("prices", prices, 0),
      asArray("dp", dp),
      ...asSimpleValue({ minPrice }),
    ],
    breakpoint: 1,
  });
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice; //
    const prev = dp[i - 1];
    s.push({
      variables: [
        asArray("prices", prices, i),
        asArray("dp", dp, i, i - 1),
        asValueGroup(
          "potential profit",
          { price, minPrice, diff },
          priceGroupOptions
        ),
        asValueGroup("which is smaller?", { diff, prev }, priceGroupOptions),
        asValueGroup("loop", { i }, { min: 0, max: prices.length }),
      ],
      breakpoint: 2,
    });
    dp[i] = Math.max(prev, diff); //
    s.push({
      variables: [
        asArray("prices", prices, i),
        asArray("dp", dp, i, i - 1),
        asValueGroup(
          "potential profit",
          { price, minPrice, diff },
          priceGroupOptions
        ),
        asValueGroup("which is smaller?", { diff, prev }, priceGroupOptions),
        asValueGroup("loop", { i }, { min: 0, max: prices.length }),
      ],
      breakpoint: 3,
    });
    minPrice = Math.min(minPrice, price);
    //
    s.push({
      variables: [
        asArray("prices", prices, i),
        asArray("dp", dp, i, i - 1),
        asValueGroup(
          "potential profit",
          { price, minPrice, diff },
          priceGroupOptions
        ),
        asValueGroup("which is smaller?", { diff, prev }, priceGroupOptions),
        asValueGroup("loop", { i }, { min: 0, max: prices.length }),
      ],
      breakpoint: 4,
    });
  }

  const result = dp[prices.length - 1];
  s.push({
    variables: [
      asArray("dp", dp, prices.length - 1),
      ...asSimpleValue({ result }),
    ],
    breakpoint: 5,
  });

  return s;
}

interface MaxProfitInput {
  prices: number[];
}
const code = `function maxProfit(prices) {
  // Initialize a dynamic programming array to store maximum profit at each step
  const dp: number[] = new Array(prices.length).fill(0);
  // Store the first price as the minimum price to compare with subsequent prices
  let minPrice = prices[0];

  //#1 Loop through each price starting from the second element
  for (let i = 1; i < prices.length; i++) {
      const price = prices[i]; // Current price in the loop
      const diff = price - minPrice; // Calculate potential profit from the minimum price so far
      const prev = dp[i - 1]; // Maximum profit calculated from previous step

      //#2 Compare and store the maximum of keeping previous max profit or updating it with the current potential profit
      dp[i] = Math.max(prev, diff);

      //#3 Update the minimum price found so far if current price is lower
      minPrice = Math.min(minPrice, price);

      //#4 Continue to the next price in the loop
  }

  // After the loop, store the last calculated maximum profit
  const result = dp[prices.length - 1];

  //#5 Return the highest profit found
  return result;
}`;

const title = "Best Time to Buy and Sell Stock";
const getInput = () => ({ prices: [7, 1, 5, 3, 6, 4] });

export const maxProfitProblem: Problem<MaxProfitInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: maxProfit,
  tested: true,
  id: "best-time-to-buy-and-sell-stock",
  tags: ["dynamic programming"],
  variableMetadata: variableMetadata,
};
