function maxProfit(prices: number[]) {
  if (prices.length === 0) return 0;

  const dp: number[] = new Array(prices.length).fill(0);
  let minPrice = prices[0];
  //#1

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const diff = price - minPrice;
    const prev = dp[i - 1];
    //#2

    dp[i] = Math.max(prev, diff);
    //#3
    minPrice = Math.min(minPrice, price);
    //#4
  }

  const result = dp[prices.length - 1];
  //#5
  return result;
}
