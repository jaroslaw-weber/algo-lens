import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger";
import { MaxProfitInput } from "./types";
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(p: MaxProfitInput): ProblemState[] {
  const l = new StepLoggerV2();
  const { prices } = p;

  if (prices.length === 0) {
    return [];
  }

  const maxPrice = Math.max(...prices)
  
  l.groupOptions.set("profit", { min: 0, max: maxPrice });
  l.groupOptions.set("smaller", { min: 0, max: maxPrice });
  l.groupOptions.set("loops", { min: 0, max: prices.length });

  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];

  l.array("prices", prices, 0);
  l.array("dp", dp);
  l.simple({ minPrice });
  l.breakpoint(1, "Starting the process with initial values. Logging initial prices and setting the first minimum price.");

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];

    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.breakpoint(2, `Day ${i}: Calculating potential profit if sold today. Comparing with previous max profit.`);

    dp[i] = Math.max(prev, diff);

    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.breakpoint(3, `Day ${i}: Updating the minimum price if today's price is lower.`);

    minPrice = Math.min(minPrice, price);

    l.array("prices", prices, i);
    l.array("dp", dp, i, i - 1);
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.group("loop", { i }, { min: 0, max: prices.length });
    l.breakpoint(4, `Day ${i}: State after updating minimum price. Preparing for next iteration.`);
  }

  const result = dp[prices.length - 1];

  l.array("prices", prices, prices.length - 1);
  l.simple({ result });
  l.breakpoint(5, "Final result calculated. Logging the maximum profit achievable.");

  return l.getSteps();
}
