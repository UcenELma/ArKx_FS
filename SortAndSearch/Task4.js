function linearSearch(arr, target) {
    const n = arr.length;

    // Loop through the array to find the target element
    for (let i = 0; i < n; i++) {
        if (arr[i] === target) {
            return i; // Return the index if the target is found
        }
    }

    return -1; // Return -1 if the target is not found
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const targetElement = 22;
const targetIndex = linearSearch(unsortedArray, targetElement);

console.log("Array:", unsortedArray);
if (targetIndex !== -1) {
    console.log(`Element ${targetElement} found at index ${targetIndex}.`);
} else {
    console.log(`Element ${targetElement} not found in the array.`);
}