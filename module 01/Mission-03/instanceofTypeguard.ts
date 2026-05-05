{
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }

    getSleep(numberofHour: number) {
      console.log(`${this.name} doinik ${numberofHour} ghonta gumai`);
    }
  }

  class Student extends Person {
    constructor(name: string) {
      super(name);
    }

    doStudy(numOfHour: number) {
      console.log(`${this.name} doinik ${numOfHour} ghonta study kore`);
    }
  }

  class Teacher extends Person {
    constructor(name: string) {
      super(name);
    }

    takeClass(numOfHour: number) {
      console.log(`${this.name} doinik ${numOfHour} ghonta class ne`);
    }
  }

  const getUerInfo = (user: Person) => {
    if (user instanceof Student) {
      user.doStudy(7);
    } else if (user instanceof Teacher) {
      user.takeClass(4);
    } else {
      user.getSleep(12);
    }
  };

  const student1 = new Student("Mr. Shahadat");
  const teacher2 = new Teacher("Mr. teacher");
  const person1 = new Person("unkknown perfson")

  getUerInfo(student1)
  getUerInfo(teacher2)
  getUerInfo(person1)

}
