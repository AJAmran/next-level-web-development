class ParentC {
  name: string;
  age: number;
  address: string;

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  getSleep(numberOfHour: number) {
    console.log(`${this.name} ${numberOfHour} ghonta ghumai`);
  }
}

class Student extends ParentC {
  rollNumber: number;

  constructor(name: string, age: number, addres: string, rollNumber: number) {
    super(name, age, addres);
    this.rollNumber = rollNumber;
  }
}

const student1 = new Student("Amran", 25, "Dhaka", 5);

student1.getSleep(480);

class Teacher extends ParentC {
  designation: string;

  constructor(name: string, age: number, address: string, designation: string) {
    super(name, age, address);
    this.designation = designation;
  }

  takeClass(ClassDuration: number) {
    console.log(`${this.name} ${ClassDuration} gonta class ne`);
  }
}

const teacher1 = new Teacher("Abul", 44, "Chattogram", "Bio teacher");
teacher1.takeClass(450);

console.log(teacher1);
