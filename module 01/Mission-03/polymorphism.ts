// polymorphism: bohurupi
class Person {
  getSleep() {
    console.log(`I'm a normal Person user. I sleep for 8 hour`);
  }
}

class Student extends Person {
  getSleep() {
    console.log(`I am a student. I sleep 7 hour`);
  }
}

class NextLeveldeveloper extends Person {
  getSleep() {
    console.log(`I am a next level developer. I sleep for 6 hour`);
  }
}

const getSleepingHour = (param: Person) => {
  param.getSleep();
};

const person1 = new Person();
const person2 = new Student();
const person3 = new NextLeveldeveloper();
getSleepingHour(person3);

class Shape {
  getArea() {
    return 0;
  }
}

class Circle extends Shape {
  radious: number;

  constructor(radius: number) {
    super();
    this.radious = radius;
  }
  getArea(): number {
    return Math.PI * this.radious * this.radious;
  }
}

class Retangle extends Shape {
  length: number;
  height: number;

  constructor(length: number, height: number) {
    super();
    this.length = length;
    this.height = height;
  }
  getArea(): number {
    return this.length * this.height;
  }
}

const getArea = (param: Shape) => {
  console.log(param.getArea());
};

const shape1 = new Shape();
const shape2 = new Circle(10);
const shape3 = new Retangle(19, 29);

getArea(shape3);
