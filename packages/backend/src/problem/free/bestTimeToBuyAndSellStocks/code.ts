export const code = `function maxProfit(prices) {
  if (prices.length === 0) return 0;

  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];

    dp[i] = Math.max(prev, diff);
    minPrice = Math.min(minPrice, price);
  }

  return dp[prices.length - 1];
}`;