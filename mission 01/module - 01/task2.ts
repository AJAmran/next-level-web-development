//todo: Project Task 2 — Mini E-Commerce Cart System 🛒

//?Goal
//Real-world TypeScript data modeling।

//todo: features
// 1. Add product
// 2. Calculate total price
// 3. apply discount
// 4. remove product
// 5. show cart summary

//? Most Use
// spread operator
// rest operator
// optional chanining
// nullish coalescing operator
// array method
// type alias

//?Bonus
// use literal type: type paymentMethod = "credit card" | "paypal" | "cash on delivery";=

//=======================================================
// Create Product type
//=======================================================

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  discount?: number;
};

//=======================================================
// Add product
//=======================================================
let cart: Product[] = [];

const addProduct = (cart: Product[], product: Product): Product[] => {
  return [...cart, product];
};

//=======================================================
// 2. Calculate Total Price Use rest/spread operator.
//=======================================================
const calculateTotalPrice = (cart: Product[]): number => {
  return cart.reduce((total, product) => {
    const productTotal = product.price * product.quantity;
    const discountAmount = product.discount
      ? productTotal * product.discount
      : 0;
    const finalPrice = total + (productTotal - discountAmount);
    return finalPrice;
  }, 0);
};

//=======================================================
// 3. Apply Discount Use nullish coalescing.
//=======================================================
const applyDiscount = (product: Product, discount: number): Product => {
  return {
    ...product,
    discount: discount ?? product.discount ?? 0,
  };
};

//=======================================================
// 4. Remove Product Use array method.
//=======================================================
const removeProduct = (cart: Product[], productId: number): Product[] => {
  return cart.filter((product) => product.id !== productId);
};

//=======================================================
// 5. Show Cart Summary Use optional chaining.
//=======================================================
const showCartSummary = (cart: Product[]): void => {
  cart.forEach((product) => {
    const discountInfo = product.discount
      ? `(Discount: ${product.discount * 100}%)`
      : "";
    console.log(
      `${product.name} - $${product.price} x ${product.quantity} ${discountInfo}`
    );
  });
};

//=======================================================
// Example Usage
//=======================================================
cart = addProduct(cart, { id: 1, name: "Laptop", price: 1000, quantity: 1 });
cart = addProduct(cart, { id: 2, name: "Phone", price: 500, quantity: 2 });
cart = addProduct(cart, { id: 3, name: "Tablet", price: 800, quantity: 1 });

console.log("Cart Summary:");
showCartSummary(cart);

const totalPrice = calculateTotalPrice(cart);
console.log("Total Price:", totalPrice);

const discountedProduct = applyDiscount(cart[0], 0.1);
console.log("Discounted Product:", discountedProduct);

const updatedCart = removeProduct(cart, 2);
console.log("Updated Cart:");
showCartSummary(updatedCart);

//