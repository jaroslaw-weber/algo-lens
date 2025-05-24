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

  l.arrayV3({ prices }, [{ value: 0, label: "current day", color: "primary" }]);
  l.arrayV3({ dp }, []);
  l.group("profit", { minPrice });
  l.comment = `First price ${prices[0]} is minimum.`;

  l.breakpoint(1);

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];

    l.arrayV3({ prices }, [
      { value: i, label: "current day", color: "primary" },
    ]);
    l.arrayV3({ dp }, [
      { value: i, label: "current day", color: "primary" },
      { value: i - 1, label: "previous day", color: "info" },
    ]);
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: Potential profit ${diff}.`;

    l.breakpoint(2);

    l.comment = `Day ${i}: Compare with max profit.`;

    l.breakpoint(3);
    dp[i] = Math.max(prev, diff);

    l.arrayV3({ prices }, [
      { value: i, label: "current day", color: "primary" },
    ]);
    l.arrayV3({ dp }, [
      { value: i, label: "current day", color: "primary" },
      { value: i - 1, label: "previous day", color: "info", dir: "bottom" },
    ]);
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: Update minPrice if ${price} is lower.`;

    l.breakpoint(4);

    minPrice = Math.min(minPrice, price);

    l.arrayV3({ prices }, [
      { value: i, label: "current day", color: "primary" },
    ]);
    l.arrayV3({ dp }, [
      { value: i, label: "current day", color: "primary" },
      { value: i - 1, label: "previous day", color: "info" },
    ]);
    l.group("profit", { price, minPrice, diff });
    l.group("smaller", { diff, prev });
    l.comment = `Day ${i}: minPrice updated to ${minPrice}.`;

    l.breakpoint(5);
    l.hide("smaller");
    l.hide("profit");
  }

  const result = dp[prices.length - 1];

  l.arrayV3({ prices }, [
    { value: prices.length - 1, label: "max profit", color: "success" },
  ]);
  l.simple({ result });
  l.comment = `All days processed. Max profit: ${result}.`;

  l.breakpoint(6);

  return l.getSteps();
}
