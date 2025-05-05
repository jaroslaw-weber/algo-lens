export function productExceptSelf(nums: number[]): number[] {
  const length = nums.length;
  const output = new Array(length).fill(1);
  const productsLeft = new Array(length).fill(1);
  const productsRight = new Array(length).fill(1);

  //#1
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    //#2
  }

  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    //#3
  }

  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    //#4
  }

  //#5
  return output;
}
