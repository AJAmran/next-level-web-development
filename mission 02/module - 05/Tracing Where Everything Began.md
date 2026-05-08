# Node.js Essentials Notes

## What is Node.js?

Node.js হলো JavaScript runtime environment যা browser ছাড়া server-side এ JavaScript run করতে দেয়।

Built on:

* Chrome V8 Engine

Created by:

* Ryan Dahl (2009)

---

# Why Node.js Was Created

আগে:

* Frontend → JavaScript
* Backend → PHP/Java/Python

Problems:

* Different languages
* Hard development
* Context switching
* Difficult code sharing

Node.js introduced:

```txt id="c8nq4r"
JavaScript Everywhere
```

---

# Main Problem Node.js Solved

## Traditional Servers

* Blocking I/O
* Thread-per-request model
* High memory usage

## Node.js Solution

* Non-blocking I/O
* Event-driven architecture
* Async programming
* Lightweight concurrency

---

# Core Concepts

## Non-blocking I/O

Task start হয় কিন্তু wait করে না।

```txt id="x3m9bq"
Start task
 ↓
Handle other requests
 ↓
Task finished
 ↓
Callback executed
```

---

## Event-Driven Architecture

সবকিছু events এর মাধ্যমে handle হয়।

Example:

```txt id="3jlwmz"
Request → Event → Handler
```

---

## Event Loop

Node.js এর main brain।

কাজ:

* completed async tasks check করা
* callback execute করা

---

## Callback Queue

Completed async tasks এখানে আসে।

---

## Call Stack

Function execution stack।

---

# Node.js Architecture

```txt id="9m6rqp"
Application Code
       ↓
Node.js APIs
       ↓
libuv
       ↓
Operating System
```

---

# libuv

Node.js এর async library।

Handles:

* file system
* networking
* thread pool
* async tasks

---

# Single Threaded but Async

Node.js:

```txt id="7m3rxl"
Single Thread
+
Async I/O
```

Heavy async tasks background এ handle হয়।

---

# Built-in Core Modules

| Module | Work           |
| ------ | -------------- |
| fs     | File system    |
| http   | HTTP server    |
| path   | Path utilities |
| os     | OS information |

---

# npm

npm = Node Package Manager

Huge package ecosystem।

[npm Registry](https://www.npmjs.com?utm_source=chatgpt.com)

Popular packages:

* Express
* Mongoose
* Socket.IO

---

# Popular Frameworks & Tools

* Express.js
* NestJS
* Socket.IO

---

# Best Use Cases

✅ REST API
✅ Realtime app
✅ Chat app
✅ Streaming
✅ Dashboard
✅ Microservices
✅ SaaS apps

---

# Pros of Node.js

✅ Same language frontend + backend
✅ Fast development
✅ Huge ecosystem
✅ High concurrency
✅ Lightweight
✅ Great for realtime systems
✅ Massive community support

---

# Cons of Node.js

❌ CPU-heavy tasks এ weak
❌ Event loop block হতে পারে
❌ Package quality inconsistent
❌ Dependency management issues

---

# Node.js Not Best For

❌ AI training
❌ Heavy scientific computing
❌ Massive CPU calculations

---

# Traditional Server vs Node.js

| Traditional Server | Node.js            |
| ------------------ | ------------------ |
| Blocking           | Non-blocking       |
| Multiple threads   | Event loop         |
| Heavy memory usage | Lightweight        |
| Slower concurrency | Better concurrency |

---

# Simple Node.js Server

```js id="v7q5rm"
const http = require("http");

http.createServer((req, res) => {
  res.end("Hello");
}).listen(3000);
```

---

# Modern Node.js Stack

```txt id="1y5krc"
Frontend:
React / Next.js

Backend:
Node.js + Express

Database:
MongoDB / PostgreSQL

Deployment:
Docker + Cloud
```

---

# Ultimate Mental Model

```txt id="m4k9qs"
Traditional Server:
"Wait until finished"

Node.js:
"Start task and move on"
```
