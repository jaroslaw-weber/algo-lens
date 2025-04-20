import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger";
import { MaxProfitInput } from "./types";

export function generateSteps(p: MaxProfitInput): ProblemState[] {
  const l = new StepLogger();
  const { prices } = p;

  if (prices.length === 0) {
    return [];
  }

  const maxPrice = Math.max(...prices);
  const priceGroupOptions = { min: 0, max: maxPrice };
  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];

  l.breakpoint(1, "Starting the process with initial values. Logging initial prices and setting the first minimum price.");
  l.array("prices", prices, 0);
  l.array("dp", dp);
  l.simple({ minPrice });
  l.save();

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];

    l.breakpoint(2, `Day ${i}: Calculating potential profit if sold today. Comparing with previous max profit.`);
    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff }, priceGroupOptions);
    l.group("smaller", { diff, prev }, priceGroupOptions);
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.save();

    dp[i] = Math.max(prev, diff);

    l.breakpoint(3, `Day ${i}: Updating the minimum price if today's price is lower.`);
    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff }, priceGroupOptions);
    l.group("smaller", { diff, prev }, priceGroupOptions);
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.save();

    minPrice = Math.min(minPrice, price);

    l.breakpoint(4, `Day ${i}: State after updating minimum price. Preparing for next iteration.`);
    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff }, priceGroupOptions);
    l.group("smaller", { diff, prev }, priceGroupOptions);
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.save();
  }

  const result = dp[prices.length - 1];

  l.breakpoint(5, "Final result calculated. Logging the maximum profit achievable.");
  l.array("prices", prices, prices.length - 1);
  l.simple({ result });
  l.save();

  return l.getSteps();
}
