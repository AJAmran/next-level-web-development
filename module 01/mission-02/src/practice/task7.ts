//todo: Task 7: Constant Literal Types

/*
Concepts: as const, typeof, Index Access Types
Scenario: Define fixed theme colors that serve as the single source of truth for your
application.

const Colors = {
Primary: "RED",
Secondary: "BLUE"
} as const;

Instructions:
Create a type ValidColor derived directly from the values of the Colors
object.
Write a function setColor(c: ValidColor) that only accepts "RED" or
"BLUE".

Hint: type ValidColor = typeof Colors[keyof typeof Colors].
*/

const Colors = {
  Primary: "RED",
  Secondary: "BLUE",
} as const;

type ValidColor = (typeof Colors)[keyof typeof Colors];

const setColor = (c: ValidColor) => {
  console.log(c);
};

setColor(Colors.Primary); // Output: RED
setColor(Colors.Secondary); // Output: BLUE)