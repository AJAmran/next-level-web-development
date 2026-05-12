//class>object

class Animal {
  name: string;
  species: string;
  sound: string;

  constructor(name: string, species: string, sound: string) {
    this.name = name;
    this.species = species;
    this.sound = sound;
  }

  makeSound() {
    console.log(`The ${this.name} making Sound ${this.sound}`);
  }
}

const dog = new Animal("Balla Dog", "Dog", "Gew gew");
dog.makeSound();
const cat = new Animal("Pusyy", "Cat", "Mew mew");

console.log(dog);

//parameter properties

class Vheicale {
  constructor(
    public name: string,
    public model: string,
    public speed: number,
  ) {}

  totallSpeed() {
    this.speed * 480;
  }
}

const bmw = new Vheicale("BMW", "2023", 48000);

bmw.totallSpeed();
console.log(bmw)