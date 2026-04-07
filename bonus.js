//*The majority element is the element that appears more than ⌊ n/2 ⌋ times in the array.
/**
 * @param {number[]} nums
 * @return {number}
 */
// loop on every element in array
// check if element equal to every array
// if it repeated more than formula then return it
const majorityElement = function (nums) {
  let count;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    count = 0;
    for (let j = 0; j < n; j++) {
      if (nums[i] == nums[j]) {
        count++;
      }
      if (count > n / 2) {
        return nums[i];
      }
    }
  }
};

const nums = [8, 8, 7, 7, 8, 8, 8];
console.log(majorityElement(nums));
