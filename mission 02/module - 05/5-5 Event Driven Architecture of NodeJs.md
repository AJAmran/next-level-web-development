# ⚡ Node.js Event-Driven Architecture + Event Loop + Process & Thread (Deep Notes)

---

# 1. Event-Driven Architecture কী?

Node.js হলো **event-driven architecture** follow করে।

👉 Meaning:

* Everything happens based on **events**
* Event ঘটলে তার handler execute হয়
* System continuously “listen” করে থাকে

---

## Real Life Analogy 🍔

Restaurant model:

* Customer = Event
* Order = Event Trigger
* Chef = Worker
* Waiter = Event Handler

```txt id="ev1"
Customer arrives → Order event → Kitchen handles → Food ready → Response
```

---

## Code Idea

```js id="ev2"
server.on("request", () => {
  console.log("Request received");
});
```

👉 এখানে "request" হলো event

---

# 2. Node.js Core Mindset

Node.js does NOT do:

❌ “wait and finish task”

It does:

✔ “start task → move on → come back later”

---

# 3. Event Loop (Heart of Node.js) ❤️

Node.js uses event loop to handle concurrency.

---

## Event Loop কী?

👉 A continuous loop that:

* checks completed async tasks
* executes callbacks
* manages execution order

---

## Event Loop Flow

```txt id="el1"
Call Stack
   ↓
Callback Queue
   ↓
Event Loop
   ↓
Call Stack Execution
```

---

## Step-by-Step

### Step 1: Sync code runs first

```txt id="el2"
console.log("A")
```

---

### Step 2: Async task sent outside

```txt id="el3"
setTimeout(() => {}, 1000)
```

---

### Step 3: OS handles task

Node doesn’t wait → OS/libuv handles it

---

### Step 4: Callback Queue

Task complete হলে callback এখানে আসে

---

### Step 5: Event Loop picks it

Event loop check করে:

👉 “Call stack empty?”

✔ Yes → execute callback

---

# 4. Call Stack কী?

👉 Call Stack = where functions execute

Example:

```js id="cs1"
function a() {
  b();
}
function b() {}
a();
```

Stack:

```txt id="cs2"
a()
 ↓
b()
```

---

# 5. Process vs Thread (VERY IMPORTANT) 🔥

---

# 5.1 Process কী?

👉 A process = independent program in execution

Example:

* Chrome browser
* VS Code
* Node.js app

---

## Process Features

✔ Own memory
✔ Independent
✔ Heavy compared to threads

---

## Visual

```txt id="p1"
Process A (Node App)
 ├── Memory
 ├── Code
 └── Resources
```

---

# 5.2 Thread কী?

👉 Thread = smallest unit of execution inside a process

---

## Example

Process: Browser

Threads:

* UI thread
* rendering thread
* network thread

---

## Visual

```txt id="t1"
Process
 ├── Thread 1
 ├── Thread 2
 └── Thread 3
```

---

# 6. Node.js is Single-Threaded (BUT NOT SIMPLE 😄)

👉 Node.js has:

✔ One main thread (JS execution)
✔ Background threads (libuv thread pool)

---

## Meaning

```txt id="n1"
JS Code → Single Thread
Heavy tasks → Thread Pool
```

---

# 7. libuv Role (IMPORTANT) ⚙️

libuv handles:

---

## 2 Major Parts:

### 1. Event Loop

### 2. Thread Pool

---

# 8. Thread Pool কী?

👉 Background worker threads group

Default: 4 threads

---

## Used For:

* file system
* DNS lookup
* crypto
* compression

---

## Flow

```txt id="tp1"
Task
 ↓
Thread Pool
 ↓
OS
 ↓
Result
 ↓
Callback Queue
 ↓
Event Loop
```

---

# 9. Async I/O কী?

👉 Input/Output operations without waiting

Examples:

* file read
* database query
* network request

---

## Blocking vs Non-blocking

### Blocking

```txt id="io1"
Read file → WAIT → continue
```

### Non-blocking

```txt id="io2"
Start read → continue → callback later
```

---

# 10. How Everything Works Together

```txt id="flow1"
JS Code
   ↓
Event Loop (checks tasks)
   ↓
libuv
   ├── Event Loop
   └── Thread Pool
   ↓
OS Kernel
   ↓
Callback Queue
   ↓
Execution
```

---

# 11. Why Node.js is Fast?

✔ No thread blocking
✔ Async I/O
✔ Event-driven model
✔ Efficient resource usage

---

# 12. Real Example (Full Lifecycle)

```js id="ex1"
fs.readFile("a.txt", () => {
  console.log("Done");
});
```

### Internally:

```txt id="ex2"
JS request
 ↓
libuv thread pool
 ↓
OS reads file
 ↓
callback queue
 ↓
event loop executes callback
```

---

# 13. Process vs Thread in Node.js Context

| Concept     | Meaning            |
| ----------- | ------------------ |
| Process     | Whole Node app     |
| Thread      | Execution unit     |
| Main Thread | JS runs here       |
| Thread Pool | Background workers |

---

# 14. Key Mental Model 🧠

```txt id="mm1"
Node.js = 1 brain (event loop)
         + workers (thread pool)
         + OS power (libuv)
```

---

# 15. Final Summary

👉 Node.js Architecture =

* Event-driven system
* Single main thread
* Async I/O model
* Event loop controls everything
* libuv handles background work
* Thread pool supports heavy tasks

---

# 🔥 One-Line Master Definition

👉 Node.js is a **single-threaded event-driven runtime** that uses **event loop + libuv thread pool** to handle thousands of concurrent operations efficiently without blocking execution.
