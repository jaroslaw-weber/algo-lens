import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(prices: number[]): ProblemState[] {
  const l = new StepLoggerV2();

  if (prices.length === 0) {
    return [];
  }

  const maxPrice = Math.max(...prices);

  l.groupOptions.set("profit", { min: 0, max: maxPrice });
  l.groupOptions.set("smaller", { min: 0, max: maxPrice });
  l.groupOptions.set("loops", { min: 0, max: prices.length });

  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];

  l.arrayV2({ prices }, { i: 0 });
  l.arrayV2({ dp });
  l.group("profit", { minPrice });
  l.comment =
    "Starting the process with initial values. Logging initial prices and setting the first minimum price.";

  l.breakpoint(1);

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];

    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 });
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: Calculating potential profit if sold today. Comparing with previous max profit.`;

    l.breakpoint(2);

    dp[i] = Math.max(prev, diff);

    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 });
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: Updating the minimum price if today's price is lower.`;

    l.breakpoint(3);

    minPrice = Math.min(minPrice, price);

    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 });
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: State after updating minimum price. Preparing for next iteration.`;

    l.breakpoint(4);
    l.hide("smaller");
    l.hide("profit");
  }

  const result = dp[prices.length - 1];

  l.arrayV2({ prices }, { result: prices.length - 1 });
  l.simple({ result });
  l.comment = "Final result calculated. Logging the maximum profit achievable.";

  l.breakpoint(5);

  return l.getSteps();
}
