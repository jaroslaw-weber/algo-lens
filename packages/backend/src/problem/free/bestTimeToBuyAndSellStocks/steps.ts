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
    `Start with the first price (${prices[0]}) as the minimum.`;

  l.breakpoint(1);

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];

    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 });
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: Calculate potential profit if selling today (${price} - ${minPrice} = ${diff}).`;

    l.breakpoint(2);

    l.comment = `Day ${i}: Compare with previous maximum profit: (${diff} > ${prev} ?). If so, remember that value.`;

    l.breakpoint(3);
    dp[i] = Math.max(prev, diff);

    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 });
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: Update minimum price (${minPrice}) if current price (${price}) is lower.`;

    l.breakpoint(4);

    minPrice = Math.min(minPrice, price);

    l.arrayV2({ prices }, { i });
    l.arrayV2({ dp }, { i, "i - 1": i - 1 });
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: Minimum price updated to ${minPrice}. Move to the next day.`;

    l.breakpoint(5);
    l.hide("smaller");
    l.hide("profit");
  }

  const result = dp[prices.length - 1];

  l.arrayV2({ prices }, { result: prices.length - 1 });
  l.simple({ result });
  l.comment = `All days processed. The maximum profit is ${result}.`;

  l.breakpoint(6);

  return l.getSteps();
}
