//todo: Task 2: Merging User Profiles

/* 
Concepts: Intersection Types (&)
Scenario: A user signs up as a basic Person, but when hired, they gain
JobDetails. An Employee is a union of both.

Instructions:
Create a new type Employee that combines Person and JobDetails.
Write a function getProfile that accepts an Employee.

Hint: Use the & operator to merge the two types.

*/

type Person = { name: string; age: number };
type JobDetails = { role: string; salary: number };

type Employee = Person & JobDetails;

const getProfile = (employee: Employee): string => {
  const { name, role } = employee;
  return `Name: ${name}, Role: ${role}`;
};

//? Example Usage:

const employee1: Employee = { name: "John Doe", age: 30, role: "Developer", salary: 50000 };
console.log(getProfile(employee1)); // Output: Name: John Doe, Role: Developer