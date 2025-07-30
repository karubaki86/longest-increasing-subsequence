//Given an array of integers, return the length of the longest increasing subsequence.
//  A subsequence is a sequence that can be derived from the array by deleting some or 
// no elements without changing the order of the remaining elements.
function lengthOfLIS(nums) {
    const n = nums.length;
    if (n === 0) return 0;

    const dp = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

//  Given an array of integers nums and an integer target,
//  return the indices of the two numbers such that they add up to target.
//  You may assume that each input would have exactly one solution, 
// and you may not use the same element twice.
//  You can return the answer in any order.
function twoSum(nums, target) {
    if (!Array.isArray(nums)) {
        throw new Error("Input must be an array.");
    }

    const map = new Map(); // Stores number → index

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }

    throw new Error("No two sum solution found.");
}
