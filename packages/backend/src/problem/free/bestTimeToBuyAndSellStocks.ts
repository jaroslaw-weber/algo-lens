import { Problem, ProblemState, VariableMetadata } from "algo-lens-core";
import { StepLogger } from "../core/StepLogger";

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
  const l = new StepLogger();
  const { prices } = p;
  const maxPrice = Math.max(...prices);
  const priceGroupOptions = { min: 0, max: maxPrice };
  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];
  //
  l.breakpoint(1);
  l.array("prices", prices, 0);
  l.array("dp", dp);
  l.simple({ minPrice });
  l.save()

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice; //
    const prev = dp[i - 1];

    l.breakpoint(2);
    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff }, priceGroupOptions);
    l.group("smaller", { diff, prev }, priceGroupOptions);
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.save()
    dp[i] = Math.max(prev, diff); //

    l.breakpoint(3);
    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff }, priceGroupOptions);
    l.group("smaller", { diff, prev }, priceGroupOptions);
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.save()
    minPrice = Math.min(minPrice, price);
    //

    l.breakpoint(4);
    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff }, priceGroupOptions);
    l.group("smaller", { diff, prev }, priceGroupOptions);
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.save()
  }

  const result = dp[prices.length - 1];

  l.breakpoint(5);
  l.array("prices", prices, prices.length - 1);
  l.simple({ result });
  l.save()

  return l.getSteps();
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
  metadata:{
    variables: variableMetadata,
    groups:[
      {
        name: "profit",
        label: "Profit",
        description: "The potential profit from buying at the minimum price and selling at the current price."
      },
      {
        name: "smaller",
        label: "Smaller",
        description: "The potential profit from buying at the minimum price and selling at the current price minus the minimum price found so far."
      },
      {
        name: "loop",
        label: "Loop",
        description: "The current day being considered (prices[i])."
      }
    ]
  },
};
