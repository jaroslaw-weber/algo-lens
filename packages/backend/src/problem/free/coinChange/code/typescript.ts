export function coinChange(coins: number[], target: number) {
  // Create an array to store the minimum number of coins required for each amount up to the target
  const dp = new Array(target + 1).fill(Infinity);
  dp[0] = 0; // Base case: no coins needed for amount 0

  //#1 Iterate through each coin denomination available
  for (let coin of coins) {
    // Evaluate every possible amount from this coin's value up to the target amount
    for (let amount = coin; amount <= target; amount++) {
      // Calculate the minimum number of coins needed if this coin is included
      const left = amount - coin;
      const include = dp[left] + 1;
      const exclude = dp[amount];
      //#2

      // Update the stored value if the calculated number is fewer than the current minimum
      if (include < exclude) {
        dp[amount] = include;

        //#3 Proceed to the next amount to evaluate with this coin
      }
    }
  }

  // Check the minimum coins needed for the target amount; return -1 if it remains Infinity
  const result = dp[target] === Infinity ? -1 : dp[target];

  //#4 Return the final calculated result
  return result;
}
