//todo: Task 8: The "Draft" Mode

/*

Concepts: Mapped Types, Readonly, Optional
Scenario: Transform a strict interface into a "Draft" version where everything is
optional and immutable.

interface MyDocument {
title: string;
content: string;
author: string;
}

Instructions:
Create a Mapped Type Draft<T>.
Iterate through all keys of T, making them readonly and ? (optional).
Declare a variable myDraft of type Draft<MyDocument>.
Hint: { readonly [P in keyof T]?: T[P] }.
*/

interface MyDocument {
  title: string;
  content: string;
  author: string;
}

type Draft<T>={
    readonly [P in keyof T]?: T[P]
}

const myDraft: Draft<MyDocument> = {
  title: "My Document",
  content: "This is my document content.",
  author: "John Doe",
}

