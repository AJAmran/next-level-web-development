//todo: Task 6: The Property Guard

/*
Concepts: keyof, Generics
Scenario: Create a utility that gets a property from an object while preventing typos
at compile-time.

const product = { id: 101, name: "Keyboard", price: 50 };

Instructions:
Create a function getProductProp<T, K>(obj: T, key: K).
Constraint K to be a valid key of T.
Return obj[key].
Hint: Use <T, K extends keyof T>.
*/

const product = { id: 101, name: "Keyboard", price: 50 };

const getProductProp = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

console.log(getProductProp(product, "name")); 
