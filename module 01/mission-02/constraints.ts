//? constraints + keyof

function getLength<T extends { length: number }>(item: T) {
    return item.length;
}

getLength("hello"); // Output: 5
getLength([1, 2, 3]); // Output: 3
