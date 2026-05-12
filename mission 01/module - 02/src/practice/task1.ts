//?task 1: The "Optional" Shopping Cart

/*
Concepts: Destructuring, Optional Properties, Default Values
Scenario: You are building a checkout system. Users might buy one item by default,
or specify a bulk quantity.
*/

type CartItem = {
  name: string;
  price: number;
  quantity?: number;
};

//? instraction:

/**
Write a function calculateTotal that takes a CartItem object.
Use Destructuring to extract properties.
If quantity is missing, ensure the calculation treats it as 1.
Return the total cost (price * quantity).
 * 
 * 
 */

const calculateTotal = (item: CartItem): number => {
  const { price, quantity = 1 } = item;
  return price * quantity;
};

//? Example Usage:

const item1: CartItem = { name: "Book", price: 10 };
const item2: CartItem = { name: "Pen", price: 2, quantity: 5 };

console.log(calculateTotal(item1)); // Output: 10
console.log(calculateTotal(item2)); // Output: 10