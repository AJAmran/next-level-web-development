//todo: project task 01 student result management system
//? goal:
//? // Practice TypeScript basic types, functions, arrays, objects,
// optional properties, union types, destructuring, and array methods.

// ======================================================
//? Step 1: Create Types
// ======================================================

// Result Literal Union Type
type Result = "pass" | "fail";

// Student Type
type Student = {
  id: number;
  name: string;
  marks: number;
  department?: string;
};

// ======================================================
//? Step 2: Create Student Array
// ======================================================

let students: Student[] = [
  { id: 1, name: "Alice", marks: 85, department: "Computer Science" },
  { id: 2, name: "Bob", marks: 72 },
  { id: 3, name: "Charlie", marks: 90, department: "Mathematics" },
  { id: 4, name: "David", marks: 60 },
  { id: 5, name: "Eve", marks: 45, department: "Physics" },
];

// ======================================================
//? Step 3: Add Student
// ======================================================
const addStudent = (students: Student[], newStudent: Student) => {
  return [...students, newStudent];
};

students = addStudent(students, {
  id: 6,
  name: "Frank",
  marks: 78,
  department: "Chemistry",
});

// ======================================================
//? Step 4: Check Student Result
// ======================================================
const checkResult = (marks: number): Result => {
  return marks >= 40 ? "pass" : "fail";
};

// ======================================================
//? Step 5: Find Passed Students
// ======================================================
const getPassedStudents = (students: Student[]): Student[] => {
  return students.filter((student) => checkResult(student.marks) === "pass");
};

const passedStudents = getPassedStudents(students);
console.log("Passed Students:", passedStudents);

// ======================================================
//? Step 6: Find Failed Students
// ======================================================
const gertFailedStudents = (students: Student[]): Student[] => {
  return students.filter((student) => checkResult(student.marks) === "fail");
};

const failedStudents = gertFailedStudents(students);
console.log("Failed Students:", failedStudents);

// ======================================================
//? Step 7: Calculate Total Marks
// ======================================================

const calculateTotalMarks = (students: Student[]): number => {
  return students.reduce((total, student) => total + student.marks, 0);
};

const totalMarks = calculateTotalMarks(students);
console.log("Total Marks:", totalMarks);

// ======================================================
//? Step 8: Calculate Average Marks
// ======================================================
const calculateAverageMarks = (students: Student[]): number => {
  const totalMarks = calculateTotalMarks(students);
  return totalMarks / students.length;
};

const averageMarks = calculateAverageMarks(students);
console.log("Average Marks:", averageMarks);


// ======================================================
//? Step 9: Find Top Student
// ======================================================
const findTopStudent = (students: Student[]): Student | null => {
  if (students.length === 0) return null;
  return students.reduce((topStudent, currentStudent) =>
    currentStudent.marks > topStudent.marks ? currentStudent : topStudent
  );
}
;
const topStudent = findTopStudent(students);
console.log("Top Student:", topStudent);


// ======================================================
//? Step 10: Print Student Info Using Destructuring
// ======================================================
const printStudentInfo = (student: Student) => {
  const { id, name, marks, department = "N/A" } = student;
  console.log(`ID: ${id}, Name: ${name}, Marks: ${marks}, Department: ${department}`);
};
