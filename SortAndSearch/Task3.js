function insertionSort(arr) {
    const n = arr.length;

    // Outer loop for each pass
    for (let i = 1; i < n; i++) {
        let currentElement = arr[i];
        let j = i - 1;

        // Inner loop to shift elements and find the correct position for the current element
        while (j >= 0 && arr[j] > currentElement) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insert the current element into its correct position
        arr[j + 1] = currentElement;
    }

    return arr;
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = insertionSort(unsortedArray.slice());

console.log("Unsorted Array:", unsortedArray);
console.log("Sorted Array:", sortedArray);Ò