//? keyof: The keyof operator in TypeScript is used to create a union type of the keys of an object type. It allows you to extract the keys of an interface or type as a type itself. This is particularly useful when working with generics, as it enables you to create functions that can operate on specific properties of an object.
function getProperty<T, K extends keyof T>(obj: T, key: K){
    return obj[key];
}

const user = { name: "John Doe", age: 30, isAdmin: true };
const named = getProperty(user, "name");