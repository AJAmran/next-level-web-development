# Node.js Architecture & Core Concepts Note

---

# 1. Server কী?

Server হলো এমন একটি system যেটা client/user এর request গ্রহণ করে এবং response দেয়।

Example:

```txt id="48wn5i"
User → Request পাঠায়
Server → কাজ করে response দেয়
```

---

# 2. Traditional Server (Multithreaded Server)

Traditional server architecture এ:

```txt id="zbw1vl"
1 Request = 1 Thread
```

Example:

```txt id="rl4sng"
Request 1 → Thread 1
Request 2 → Thread 2
Request 3 → Thread 3
```

---

# 3. Thread কী?

Thread হলো execution worker।

একটি thread একসাথে একটি task execute করে।

---

# 4. Multithreaded Server Problem

যদি অনেক request আসে:

```txt id="1ycc1q"
10,000 Request
→ 10,000 Thread
```

Problem:

* বেশি RAM লাগে
* Context switching overhead হয়
* Performance কমে যায়

---

# 5. Node.js Single Threaded

Node.js এ:

```txt id="bhav91"
JavaScript code একটাই main thread এ run হয়
```

মানে:

```txt id="c16mjr"
Single JavaScript Execution Thread
```

---

# 6. তাহলে Node.js Multiple Request Handle করে কীভাবে?

Node.js ব্যবহার করে:

* Event Loop
* Non-blocking I/O
* Async Operations

---

# 7. Blocking I/O

যখন কোনো operation শেষ না হওয়া পর্যন্ত program wait করে থাকে।

Example:

```js id="nqvw0z"
const data = fs.readFileSync("file.txt");

console.log(data);
```

এখানে:

* File read শেষ না হওয়া পর্যন্ত
* পুরো thread block থাকবে

এটাই Blocking I/O।

---

# 8. Non-Blocking I/O

Node.js wait করে না।

Example:

```js id="cv1u1t"
fs.readFile("file.txt", (err, data) => {
  console.log(data);
});

console.log("Next Work");
```

Output:

```txt id="2mw5nn"
Next Work
(file data পরে আসবে)
```

মানে:

* File background এ read হচ্ছে
* meanwhile Node অন্য কাজ করছে

এটাই Non-blocking I/O।

---

# 9. I/O Intensive Task

যেসব task এ waiting বেশি হয় এবং CPU কাজ কম হয়।

Examples:

* Database query
* File read/write
* API request
* Network request

Node.js এসব task এ খুব efficient।

---

# 10. CPU Intensive Task

যেসব task এ heavy calculation লাগে।

Examples:

* Video processing
* Image processing
* Encryption
* Large loops
* AI computation

Example:

```js id="5bxxqn"
while(true) {
  // heavy calculation
}
```

Problem:

```txt id="p7a3m7"
Main thread busy হয়ে যায়
```

তখন সব request আটকে যেতে পারে।

---

# 11. Event Loop

Event Loop হলো Node.js এর heart।

এটা continuously check করে:

```txt id="d5isj8"
কোন async task complete হয়েছে?
```

যখন task complete হয়:

```txt id="0f76rz"
Callback Queue → Event Loop → Call Stack
```

---

# 12. Simplified Event Loop Flow

```txt id="2l7blg"
Call Stack Empty?
        ↓
      YES
        ↓
Queue থেকে callback নাও
        ↓
Execute করো
```

---

# 13. Node.js Multiple Request Handling

Flow:

```txt id="dd7p5r"
Request আসে
      ↓
Event Loop receive করে
      ↓
I/O Task background এ পাঠায়
      ↓
Node meantime অন্য request handle করে
      ↓
Task complete হলে callback execute হয়
```

---

# 14. libuv কী?

libuv হলো Node.js এর internal C library।

এটা handle করে:

* Event Loop
* Async I/O
* Thread Pool
* Networking

---

# 15. Thread Pool

সব operation OS async ভাবে handle করতে পারে না।

যেমন:

* File system operations
* Crypto
* DNS lookup

তখন libuv internally thread pool ব্যবহার করে।

Default:

```txt id="jlwmjt"
4 Threads
```

---

# 16. Node.js আসলে পুরোপুরি Single Threaded না

Important Concept:

```txt id="k89v2v"
JavaScript Execution = Single Threaded
```

কিন্তু background এ:

* OS
* libuv
* Thread Pool

parallel ভাবে কাজ করে।

---

# 17. Scalability

Scalability মানে:

```txt id="y9w45r"
বেশি user/load handle করার ability
```

---

# 18. Vertical Scaling

একই server আরও powerful করা।

Example:

```txt id="0n3t7u"
4GB RAM → 32GB RAM
2 Core CPU → 16 Core CPU
```

Problem:

* Expensive
* Hardware limit আছে

---

# 19. Horizontal Scaling

আরও server add করা।

Example:

```txt id="qy7gxq"
Server 1
Server 2
Server 3
```

Load ভাগ হয়ে যায়।

Modern systems এ এটা বেশি ব্যবহৃত হয়।

---

# 20. Node.js Horizontal Scaling এ ভালো কেন?

কারণ:

* Lightweight
* কম resource লাগে
* অনেক instance run করা যায়

---

# 21. Node.js কেন জনপ্রিয়?

কারণ এটি:

✅ Non-blocking
✅ Fast I/O handling
✅ High concurrency
✅ Lightweight
✅ Real-time communication friendly

---

# 22. Node.js কোথায় বেশি ব্যবহার হয়?

* REST API
* Realtime Chat App
* WebSocket Server
* Streaming App
* Notification System
* Microservices

---

# 23. Node.js Limitations

## 1. CPU Intensive Task এ দুর্বল

Heavy computation main thread block করে।

---

## 2. Single Thread Bottleneck

একটা heavy JS code পুরো app slow করতে পারে।

---

## 3. সব project এর জন্য best না

Heavy computation এর জন্য:

* Go
* Rust
* Java
* C++

অনেক সময় better option।

---

# 24. Traditional Server vs Node.js

## Traditional Server

```txt id="3qf9mg"
1 Request = 1 Thread
```

## Node.js

```txt id="oglbwf"
Single Thread
+ Event Loop
+ Non-blocking I/O
```

---

# 25. Final Summary

## Node.js Core Idea

```txt id="a6tqzq"
Node.js নিজে wait করে না।
I/O task background এ পাঠিয়ে দেয়।
Meanwhile অন্য request handle করে।
```

এ কারণেই Node.js:

✅ High concurrent connection handle করতে পারে
✅ কম resource ব্যবহার করে
✅ Fast এবং scalable হয় 🚀
