// generics = এমন type system যেটা daynmic + reusable + type-safe
// age theke type na jene pore type decide kora

//? basic generic

function identity<T>(value: T): T {
  return value;
}

//? eykhane T = type variable,
identity<string>("hello");
identity<number>(45);
identity<boolean>(true);

//? generic with array

function getArray<T>(value: T): T[] {
  return [value];
}

getArray<number>(5); // Output: [5]
getArray<string>("hello"); // Output: ["hello"]
getArray<boolean>(true); // Output: [true]

//? Multiple Generics
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

pair<number, string>(1, "age"); // Output: [1, "age"]
pair<string, boolean>("isAdmin", true); // Output: ["isAdmin", true]

//? generic interface

interface IApiResponse<T> {
  data: T;
  success: boolean;
}

type User = {
  name: string;
};

const response: IApiResponse<User> = {
  data: { name: "John Doe" },
  success: true,
};

//? generic type alias
type Box<T> = {
  value: T;
};

const box1: Box<number> = { value: 10 };

//? Generic with function (Real Use)
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then((response) => response.json());
}

fetchData<User>("https://jsonplaceholder.typicode.com/users/1");

//? constraints

