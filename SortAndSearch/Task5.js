function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            return mid; // Return the index if the target is found
        } else if (arr[mid] < target) {
            low = mid + 1; // If target is greater, search the right half
        } else {
            high = mid - 1; // If target is smaller, search the left half
        }
    }

    return -1; // Return -1 if the target is not found
}

// Example usage (Requires a sorted array)
const sortedArray = [11, 12, 22, 25, 34, 64, 90];
const targetElement = 22;
const targetIndex = binarySearch(sortedArray, targetElement);

console.log("Sorted Array:", sortedArray);
if (targetIndex !== -1) {
    console.log(`Element ${targetElement} found at index ${targetIndex}.`);
} else {
    console.log(`Element ${targetElement} not found in the array.`);
}