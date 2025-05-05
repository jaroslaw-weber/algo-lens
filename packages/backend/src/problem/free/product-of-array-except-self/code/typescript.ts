// Example implementation of the productExceptSelf function for demonstration and testing
export default function productExceptSelf(nums: number[]): number[] {
  const length = nums.length;
  const output = new Array(length).fill(1);
  const productsLeft = new Array(length).fill(1);
  const productsRight = new Array(length).fill(1);

  // Calculate products of elements to the left of each index
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
  }

  // Calculate products of elements to the right of each index
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
  }

  // Calculate the final output array by multiplying left and right products
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
  }

  // Return the resulting array
  return output;
}
