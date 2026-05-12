//todo: Task 4: Type Assertion

/* 
Concepts: Type Assertion (as), unknown type
Scenario: You receive a value from a 3rd-party library typed as unknown. You are
certain it's a string and need to manipulate it.

let secretValue: unknown = "typescript is awesome";

Instructions:
Create a variable upperValue.
Assign secretValue to it using Type Assertion.
Call .toUpperCase() on the resulting value.
Hint: Use the value as string syntax.

*/


let secretValue: unknown = "typescript is awesome";


const upperValue = (secretValue as string).toUpperCase();
console.log(upperValue);