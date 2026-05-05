// in typeof

//typeof guard

type alphaNumeric = number | string;

const add = (number1: alphaNumeric, number2: alphaNumeric) => {
  if (typeof number1 === "number" && typeof number2 === "number") {
    return number1 + number1;
  } else {
    return number1.toString() + number2.toString();
  }
};

const res1 = add(1, "2");
const res2 = add(1, 2);

console.log(res1, res2);

//in guard
type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: string;
};

const getUserInfo = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(`this is ${user.name} and his role is ${user.role}`);
  }else{
 console.log(`this is ${user.name}`);
  }
};

getUserInfo({name: "Amran", role: "Amdin"})