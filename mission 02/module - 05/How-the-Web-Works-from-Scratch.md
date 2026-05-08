# 🌐 How The Web Works — Complete Notes (Basic → Advanced)

---

# 1. Internet vs Web

## Internet

* Global network of connected computers
* Infrastructure / network system
* Data transfer করে

### Example

```txt id="4j6j8i"
Your PC → Router → ISP → Internet → Server
```

---

## Web (WWW)

* Internet-এর উপর চলা service
* Website access করার system

Uses:

* HTTP/HTTPS
* Browser
* Web Server

---

# 2. Website কী?

Website = collection of files

### Files

```txt id="jqqnpo"
index.html
style.css
app.js
image.png
```

---

# 3. Browser কী?

Browser website render করে।

Examples:

* Google Chrome
* Mozilla Firefox
* Microsoft Edge

### Browser কাজ

* Request পাঠানো
* HTML parse করা
* CSS apply করা
* JavaScript run করা
* Page render করা

---

# 4. Server কী?

Server = always-running computer

### কাজ

* Request receive করা
* Data send করা

### Example

```txt id="c0zhh0"
Browser → "Homepage দাও"
Server → HTML/CSS/JS পাঠায়
```

---

# 5. URL Structure

Example:

```txt id="wykgjt"
https://google.com/search
```

| Part       | Meaning  |
| ---------- | -------- |
| https      | protocol |
| google.com | domain   |
| /search    | path     |

---

# 6. Domain Name

Human readable name।

Example:

```txt id="v2t20w"
google.com
facebook.com
```

---

# 7. IP Address

Computer domain বুঝে না।

Computer বুঝে:

```txt id="2gq3gz"
142.250.193.14
```

---

# 8. DNS

DNS = Domain Name System

Internet-এর phonebook।

### কাজ

```txt id="8q0mcu"
google.com → IP address
```

---

## DNS Flow

```txt id="jkp0lx"
Browser
   ↓
DNS Server
   ↓
IP Address
```

---

# 9. TCP Connection

Reliable connection system।

### Features

* Data loss prevent
* Correct order maintain
* Reliable transfer

---

# 10. TCP Handshake

3 steps:

```txt id="x3fnhu"
SYN
SYN-ACK
ACK
```

---

## Visual

```txt id="qrrs3s"
Client ---- SYN ----> Server
Client <-- SYN ACK -- Server
Client ---- ACK ----> Server
```

---

# 11. HTTP

HTTP = HyperText Transfer Protocol

Browser ↔ Server communication language।

---

# 12. HTTPS

Secure HTTP।

Uses:

* SSL/TLS encryption

### Benefits

* Secure
* Password protected
* Hacker cannot read data

---

# 13. SSL/TLS

Encryption layer।

```txt id="r16a8r"
Normal Data
   ↓
Encrypted
   ↓
Internet
   ↓
Server decrypts
```

---

# 14. HTTP Request

Browser request পাঠায়।

Example:

```http id="db8tba"
GET /
Host: google.com
```

---

# 15. HTTP Methods

| Method | Work        |
| ------ | ----------- |
| GET    | Data আনা    |
| POST   | Data পাঠানো |
| PUT    | Update      |
| DELETE | Delete      |

---

# 16. HTTP Response

Server response দেয়।

Example:

```http id="c39gr8"
HTTP/1.1 200 OK
Content-Type: text/html
```

---

# 17. Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 404  | Not found    |
| 500  | Server error |
| 301  | Redirect     |

---

# 18. HTML

HTML = structure

Example:

```html id="bw5g0o"
<h1>Hello</h1>
<p>Text</p>
```

---

# 19. CSS

CSS = design/style

Example:

```css id="qcxewg"
h1 {
  color: red;
}
```

---

# 20. JavaScript

JavaScript = behavior/logic

Example:

```js id="oh5i8m"
button.onclick = () => {
  alert("Clicked");
}
```

---

# 21. DOM

DOM = Document Object Model

HTML → Tree structure

---

## DOM Visual

```txt id="j9wgh4"
html
 └── body
      └── h1
```

---

# 22. CSSOM

CSS tree structure।

---

# 23. Render Tree

```txt id="ljljdx"
DOM + CSSOM = Render Tree
```

---

# 24. Layout Phase

Browser calculate করে:

* width
* height
* position

---

# 25. Paint Phase

Screen এ pixels draw হয়।

---

# 26. Reflow

Layout recalculation।

Heavy হলে site slow হয়।

---

# 27. Repaint

Only visual repaint।

---

# 28. JavaScript Engine

Chrome uses:

* V8 Engine

---

# 29. Event Loop

JavaScript async কাজ handle করে।

---

# 30. Call Stack

Function execution stack।

---

# 31. Web APIs

Browser provided features:

* setTimeout
* fetch
* DOM API

---

# 32. Backend

Server-side logic।

Technologies:

* Node.js
* Python
* PHP
* Java
* Go

---

# 33. Frontend

User যা দেখে।

Uses:

* HTML
* CSS
* JavaScript

---

# 34. Database

Data storage system।

Examples:

* MySQL
* PostgreSQL
* MongoDB

---

# 35. API

Application Programming Interface

Frontend ↔ Backend communication।

Example:

```txt id="yz2m56"
GET /users
```

---

# 36. JSON

Common data format।

Example:

```json id="4g4g3r"
{
  "name": "Amran",
  "age": 22
}
```

---

# 37. Static Website

Same content for everyone।

---

# 38. Dynamic Website

Database-based content।

Example:

```txt id="4ixwtx"
Welcome Amran
```

---

# 39. Authentication

User verify করা।

Example:

* Login
* Password

---

# 40. Authorization

কে কী access পাবে।

Example:

* Admin
* User

---

# 41. Cookies

Browser এ small data store।

Example:

```txt id="k4x2sy"
theme=dark
token=abc123
```

---

# 42. Session

Server-side user state।

---

# 43. JWT Token

Authentication token।

---

# 44. Cache

Previously loaded files save রাখা।

Benefits:

* Faster load
* Less server load

---

# 45. CDN

CDN = Content Delivery Network

Nearest server থেকে file দেয়।

---

# 46. Hosting

Website server এ রাখা।

---

# 47. Domain vs Hosting

| Domain     | Hosting      |
| ---------- | ------------ |
| google.com | server files |

---

# 48. Ports

| Port | Service |
| ---- | ------- |
| 80   | HTTP    |
| 443  | HTTPS   |
| 22   | SSH     |

---

# 49. WebSocket

Real-time connection।

Uses:

* Chat app
* Live game
* Messenger

---

# 50. HTTP Stateless

Server automatically remember করে না।

তাই লাগে:

* cookies
* session
* token

---

# 51. Browser Storage

Types:

* LocalStorage
* SessionStorage
* Cookies

---

# 52. LocalStorage

Permanent browser storage।

---

# 53. SessionStorage

Tab close হলে delete হয়।

---

# 54. CORS

Cross-Origin Resource Sharing

Security system।

---

# 55. Same Origin Policy

Different domain restriction।

---

# 56. XSS Attack

Malicious JS injection।

---

# 57. SQL Injection

Database attack।

---

# 58. CSRF

Fake request attack।

---

# 59. Hashing

Password secure করা।

---

# 60. Encryption

Data unreadable করা।

---

# 61. Compression

File size কমানো।

Examples:

* gzip
* brotli

---

# 62. Lazy Loading

Needed হলে load করা।

---

# 63. Minification

Code ছোট করা।

---

# 64. Bundling

Multiple files → single file।

---

# 65. SPA

Single Page Application

Example:

* React app

---

# 66. SSR

Server Side Rendering

Example:

* Next.js

---

# 67. CSR

Client Side Rendering

Browser renders UI।

---

# 68. SSG

Static Site Generation

Build time এ HTML তৈরি।

---

# 69. React

Frontend library।

---

# 70. Node.js

JavaScript backend runtime।

---

# 71. Express.js

Node.js backend framework।

---

# 72. Docker

Application containerization।

---

# 73. Reverse Proxy

Example:

* Nginx

---

# 74. Load Balancer

Traffic distribute করে multiple server এ।

---

# 75. Scaling

More traffic handle করা।

---

# 76. Cloud Computing

Remote server system।

Examples:

* [Amazon Web Services](https://aws.amazon.com?utm_source=chatgpt.com)
* [Google Cloud](https://cloud.google.com?utm_source=chatgpt.com)

---

# 77. CI/CD

Automatic deploy pipeline।

---

# 78. Git

Version control system।

---

# 79. GitHub

Code hosting platform।

[GitHub](https://github.com?utm_source=chatgpt.com)

---

# 80. Deployment

Website live করা।

---

# 81. Full Web Flow

```txt id="njgbpw"
User
 ↓
Browser
 ↓
DNS
 ↓
IP Found
 ↓
TCP Connection
 ↓
HTTPS Encryption
 ↓
HTTP Request
 ↓
Server
 ↓
Backend
 ↓
Database
 ↓
Response
 ↓
Browser Render
 ↓
Website Visible
```

---

# 82. Complete Mental Model

```txt id="j6o9j3"
Browser = Viewer
Server = Kitchen
Database = Storage
Internet = Road
HTTP = Language
DNS = Phonebook
HTML = Skeleton
CSS = Beauty
JavaScript = Brain
```

---

# 83. Learning Roadmap

## Phase 1

* HTML
* CSS

## Phase 2

* JavaScript

## Phase 3

* DOM
* Async JS
* Fetch API

## Phase 4

* React

## Phase 5

* Backend

  * Node.js
  * Express

## Phase 6

* Database

## Phase 7

* Authentication

## Phase 8

* Deployment
* Docker
* Linux
