//? type assertion is a way to tell the compiler that you know more about a value's type than it does
let value: unknown = "Hello, World!";

let strLenght = (value as string).length;
console.log(strLenght); // Output: 13






