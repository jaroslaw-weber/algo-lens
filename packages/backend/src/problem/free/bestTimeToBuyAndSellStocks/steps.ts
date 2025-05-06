import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger";
import { MaxProfitInput } from "./types";
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
  l.breakpoint(
    1,
    "Starting the process with initial values. Logging initial prices and setting the first minimum price."
  );

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];

    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 });
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.breakpoint(
      2,
      `Day ${i}: Calculating potential profit if sold today. Comparing with previous max profit.`
    );

    dp[i] = Math.max(prev, diff);

    // Breakpoint 3: After updating dp[i], before updating minPrice
    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 }); // dp[i] is now updated
    l.simple({ minPrice }); // Log minPrice *before* update
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.breakpoint(
      3,
      `Day ${i}: Updated max profit dp[${i}] to ${dp[i]}. Current minPrice is ${minPrice}.`
    );
    // Hide smaller group after breakpoint 3 as diff/prev comparison is done
    l.hide("smaller");

    minPrice = Math.min(minPrice, price);

    // Breakpoint 4: After updating minPrice
    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i }); // Only need to show updated dp[i]
    l.simple({ minPrice }); // Log minPrice *after* update
    l.group("profit", { price, minPrice }); // Show updated minPrice, diff is less relevant now
    l.breakpoint(
      4,
      `Day ${i}: Updated minPrice to ${minPrice}. Preparing for next iteration.`
    );
    // Hide profit group after breakpoint 4 as iteration ends
    l.hide("profit");
  }

  const result = dp[prices.length - 1];

  // Breakpoint 5: After loop, final result obtained
  l.arrayV2({ prices }); // Show final prices array
  l.arrayV2({ dp }, { result: prices.length - 1 }); // Highlight final element in dp
  l.simple({ result });
  l.breakpoint(
    5,
    `Finished loop. Final max profit is dp[${prices.length - 1}] = ${result}.`
  );

  return l.getSteps();
}
