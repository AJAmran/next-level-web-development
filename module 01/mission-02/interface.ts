//? interface: a syntactical contact that define the "shape" or structure of an object, class, or function. It is a powerful tool in TypeScript that allows developers to define the expected structure of objcet should follow.
//? It is used to define the properties and methods that an object should have, without providing the implementation details. Interfaces are a way to enforce a certain structure on objects, ensuring that they adhere to a specific contract.

interface IUser {
  name: string;
  age: number;
  email?: string;
}

//? can be merged

interface IUser {
  address: string;
}

//? can be extended

interface IEmployee extends IUser {
  employeeId: number;
}

//? rules: object হলে interface
//? complex type হলে type alias

//? readonly properties

interface IUser {
  readonly id: number;
  name: string;
}

// const user1: IUser = {
//   id: 1,
//   name: "John Doe",
// };

//user1.id =2; // error

//? function interface:

interface IAdd {
  (a: number, b: number): number;
}

const add: IAdd = (a, b) => a + b;

console.log(add(2, 3)); // Output: 5

//? Method inside interface:
interface IUs {
  name: string;
  greet(): string;
}

const user8: IUs = {
  name: "Alice",
  greet() {
    return `Hello, my name is ${this.name}`;
  },
};

console.log(user8.greet()); // Output: Hello, my name is Alice

//nested interface:

interface IAddress {
  street: string;
  city: string;
}

interface IUse {
  name: string;
  age: number;
  address: IAddress;
}

const user9: IUse = {
  name: "Alice",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
  },
};

console.log(user9); // Output: { name: 'Alice', age: 30, address: { street: '123 Main St', city: 'New York' } }

//? extedning interface:
interface IAnimal {
  name: string;
}

interface IDog extends IAnimal {
  breed: string;
}

const dog: IDog = {
  name: "Buddy",
  breed: "Labrador",
};
console.log(dog); // Output: { name: 'Buddy', breed: 'Labrador' }
//? mutiple extending interface:

interface A {
  a: string;
}
interface B {
  b: string;
}
interface C extends A, B {}

//? interface vs type alias:
//? interface can be merged, type alias cannot
//? interface can be extended, type alias cannot
//? interface can only describe object types, type alias can describe any type

//? real example of interface:

interface IProduct {
  id: number;
  name: string;
  price: number;
}

//User System:
interface IUser3 {
  id: number;
  email: string;
  role: "admin" | "user" | "guest";
}

//interface with array;

interface IOrder {
  orderId: number;
  products: IProduct[];
}

const order: IOrder = {
  orderId: 1,
  products: [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Mouse", price: 49.99 },
  ],
};

//constraints:

function getLength<T extends { length: number }>(item: T) {
  return item.length;
}

getLength("hello"); // Output: 5
getLength([1, 2, 3]); // Output: 3

//? keyof with generics:
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user10 = {
  id: 1,
  name: "Alice",
  age: 30,
};
console.log(getProperty(user10, "name")); // Output: Alice

//Default generic:

function createArray<T = number>(lenght: number, value: t): T[] {
  return [value];
}

console.log(createArray(5, 0)); // Output: [0, 0, 0, 0, 0]
console.log(createArray(3, "hello")); // Output: ['hello', 'hello', 'hello']

// Generic class:
class Box<T> {
  constructor(public value: T) {}
}

const numberBox = new Box(123);
const stringBox = new Box("Hello");

//Real life Problem solving:
interface IProduct {
  id: number;
  price: number;
}

function addToCart<T extends IProduct>(product: T): T {
  return product;
}
