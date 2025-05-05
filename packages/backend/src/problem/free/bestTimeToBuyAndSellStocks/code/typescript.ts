export function maxProfit(prices: number[]) {
  // If there are no prices, no profit can be made.
  if (prices.length === 0) return 0;

  // dp[i] will store the maximum profit achievable up to day i.
  const dp: number[] = new Array(prices.length).fill(0);
  // Initialize minPrice to the price on the first day.
  let minPrice = prices[0];
  //#1

  // Iterate through the prices starting from the second day.
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    // Calculate the potential profit if sold today, buying at the minimum price seen so far.
    const diff = price - minPrice;
    // Get the maximum profit from the previous day.
    const prev = dp[i - 1];
    //#2

    // The maximum profit up to day i is the maximum of:
    // 1. The maximum profit up to the previous day (dp[i-1]).
    // 2. The profit from buying at minPrice and selling at the current price (diff).
    dp[i] = Math.max(prev, diff);
    //#3
    // Update the minimum price seen so far.
    minPrice = Math.min(minPrice, price);
    //#4
  }

  // The final result is the maximum profit achievable up to the last day.
  const result = dp[prices.length - 1];
  //#5
  return result;
}
