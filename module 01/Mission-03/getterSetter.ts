//? getter = data read
//? setter = data update/

// stop direct access=>controllled access

/*


class User {
  public age: number = 0;
}

const u1 = new User();
u1.age = 22;
u1.age = -25;
console.log(u1);


class User {
  private _age: number = 0;

  set age(value: number){
    if(value < 0){
        throw new Error("Age can't be negative");
    }
    this._age = value;
  }

  get age(): number {
    return this._age;
  
  }
}

const u1 = new User();
u1.age = 22;
console.log(u1);
*/

//Problem: Restaurant Order System
//1. totalPrice
//2. discount
//3. status
//4. items

type OrderStatus = "pending" | "cooking" | "delivered";

class Order {
  private _items: { name: string; price: number }[] = [];
  private _discount: number = 0;
  private _status: OrderStatus = "pending";

  //add itm method
  addItem(name: string, price: number) {
    if (price <= 0) {
      throw new Error("Price must be positive");
    }
    this._items.push({ name, price });
  }

  //getter: total price (auto calculate)
  get TotalPrice() {
    const total = this._items.reduce((acc, item) => acc + item.price, 0);
    return total * (1 - this._discount);
  }

  //setter: discount with validation
  set discount(value: number) {
    if (value < 0 || value > 50) {
      throw new Error("Discount must be between 0 and 50");
    }
    this._discount = value;
  }

  //getter: discount
  get discount() {
    return this._discount;
  }

  //setter status (restricted values)
  set status(value: OrderStatus) {
    if (["pending", "cooking", "delivered"].includes(value)) {
      this._status = value;
    } else {
      throw new Error("Invalid status");
    }
  }

  //getter status
  get status() {
    return this._status;
  }

  //getter items
  get items() {
    return this._items;
  }
}

const order = new Order();
order.addItem("Burger", 10);
order.addItem("Pizza", 15);
order.discount = 0.2;
order.status = "delivered";





console.log(order.items);
console.log(order.TotalPrice);
console.log(order.status);