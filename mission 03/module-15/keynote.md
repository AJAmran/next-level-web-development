# PostgreSQL Essentials (Module 15) - Full Study Notes & Practice Guide
**Author:** Md. Amran Hossen  
**Topic:** Basic to Advanced PostgreSQL with Best Practices, Optimizations, and Common Mistakes.

---

## 📌 Table of Contents
1. [15-1: Handling NULL With COALESCE](#15-1-handling-null-with-coalesce)
2. [15-2: LIMIT, OFFSET Pagination](#15-2-limit-offset-pagination)
3. [15-3 & 15-4: Updating & Deleting Data](#15-3--15-4-updating--deleting-data)
4. [15-5 & 15-6: GROUP BY With HAVING](#15-5--15-6-group-by-with-having)
5. [15-7 & 15-8: Foreign Key Constraints](#15-7--15-8-foreign-key-constraints)
6. [15-9 to 15-12: All Joins Overview](#15-9-to-15-12-all-joins-overview)
7. [🛠️ Practical Project Setup (Demo Database)](#️-practical-project-setup-demo-database)
8. [🚀 Practice Queries & Use Cases](#-practice-queries--use-cases)

---

## 15-1: Handling NULL With COALESCE

### 🔹 বেসিক ধারণা
ডেটাবেসে কোনো ডেটা অনুপস্থিত থাকলে তাকে `NULL` বলা হয়। এটি ফাঁকা স্ট্রিং `""` বা `0` নয়। গাণিতিক ক্যালকুলেশন বা স্ট্রিং কনক্যাটিনেশনের সময় কোনো ভ্যালু `NULL` হলে পুরো রেজাল্ট `NULL` হয়ে যায়। `COALESCE` ফাংশনটি তার আর্গুমেন্টগুলোর মধ্যে প্রথম যে ভ্যালুটি `NULL` নয়, সেটি রিটার্ন করে।

### 💡 বেস্ট প্র্যাকটিস ও অপ্টিমাইজেশন
* ফ্রন্টএন্ডে বা এপিআই রেসপন্সে এরর এড়াতে ডিফল্ট ভ্যালু (যেমন: 'N/A' বা `0`) বসাতে এটি ব্যবহার করুন।
* গাণিতিক হিসেব-নিকেশের সময় (যেমন: `Price - Discount`) অবশ্যই `COALESCE(discount, 0)` ব্যবহার করা উচিত।

### ⚠️ সাধারণ ভুল (Common Mistakes)
* সব কলামে জোর করে `COALESCE` ব্যবহার করা। যদি কোনো কলামের লজিক্যাল অর্থই হয় ফাঁকা থাকা (যেমন: `deleted_at`), সেখানে জোর করে ডিফল্ট ভ্যালু বসানো উচিত নয়।

---

## 15-2: LIMIT, OFFSET Pagination

### 🔹 বেসিক ধারণা
একসাথে ডেটাবেসের লাখ লাখ ডেটা লোড না করে নির্দিষ্ট খণ্ডে (Chunk) ডেটা ফ্রন্টএন্ডে নিয়ে আসাকে প্যাজিনেশন বলে।
* `LIMIT`: কুয়েরি সর্বোচ্চ কতটি রো (Row) রিটার্ন করবে।
* `OFFSET`: প্রথম থেকে কতটি রো স্কিপ বা বাদ দিয়ে গণনা শুরু করবে।

### 💡 বেস্ট প্র্যাকটিস ও অপ্টিমাইজেশন (Scalability)
* **বড় ডেটাসেটের সমস্যা:** `OFFSET 100000 LIMIT 10` দিলে ডেটাবেসকে প্রথমে ১ লাখ ডেটা মেমোরিতে প্রসেস করে তারপর ফেলে দিতে হয়। এটি অত্যন্ত ধীরগতির।
* **স্কেলেবল সমাধান:** বড় প্রোডাকশন ডেটাবেসে **Cursor-based Pagination** (বা Keyset Pagination) ব্যবহার করুন। 
  * *উদাহরণ:* `WHERE id > last_seen_id LIMIT 10` (এটি ইন্ডেক্স স্ক্যান করে দ্রুত ডেটা এনে দেয়)।

### ⚠️ সাধারণ ভুল (Common Mistakes)
* `ORDER BY` ছাড়া `LIMIT` এবং `OFFSET` ব্যবহার করা। সর্টিং না করলে প্রতিবার রিকোয়েস্টে এলোমেলো বা ডুপ্লিকেট ডেটা আসতে পারে।

---

## 15-3 & 15-4: Updating & Deleting Data

### 🔹 বেসিক ধারণা
বিদ্যমান ডেটা পরিবর্তন করা বা মুছে ফেলার জন্য `UPDATE` এবং `DELETE` স্টেটমেন্ট ব্যবহার করা হয়।

### 💡 বেস্ট প্র্যাকটিস ও অপ্টিমাইজেশন
* **RETURNING Clause:** ডেটা আপডেট বা ডিলিট করার পর সাথে সাথে সেই পরিবর্তিত ডেটা ফেরত পাওয়ার জন্য `RETURNING *` ব্যবহার করুন। এতে পুনরায় `SELECT` কুয়েরি চালানোর প্রয়োজন হয় না (Network Round-trip কমে)।
* **Soft Delete:** প্রোডাকশন লেভেলে ডেটা একেবারে ডিলিট না করে টেবিলে `is_deleted` বা `deleted_at` কলাম রেখে তা আপডেট করা ভালো।

### ⚠️ সাধারণ ভুল (Common Mistakes)
* **WHERE ক্লজ ভুলে যাওয়া:** `WHERE` ক্লজ ছাড়া `UPDATE` বা `DELETE` কুয়েরি চালালে টেবিলের সমস্ত ডেটা একসাথে পরিবর্তিত বা মুছে যাবে!

---

## 15-5 & 15-6: GROUP BY With HAVING

### 🔹 বেসিক ধারণা
একই ধরনের বৈশিষ্ট্যযুক্ত ডেটাকে এক দল বা গ্রুপে রূপান্তর করে তাদের ওপর অ্যাগ্রিগেশন ফাংশন (COUNT, SUM, AVG, MAX, MIN) চালানো।
* `WHERE`: গ্রুপ করার **আগে** সিঙ্গেল রো ফিল্টার করে।
* `HAVING`: গ্রুপ করার **পর** গ্রুপের ওপর ফিল্টার বসায়।

### ⚠️ সাধারণ ভুল (Common Mistakes)
* `SELECT` ক্লজে এমন কোনো নন-অ্যাগ্রিগেটেড কলাম ব্যবহার করা যা `GROUP BY`-এর ভেতর উল্লেখ করা হয়নি।
* `WHERE` ক্লজের ভেতরে `COUNT()` বা `SUM()` এর মতো অ্যাগ্রিগেট ফাংশন ব্যবহার করার চেষ্টা করা (যা সম্পূর্ণ ভুল)।

---

## 15-7 & 15-8: Foreign Key Constraints

### 🔹 বেসিক ধারণা
দুটি টেবিলের মধ্যে যৌক্তিক সম্পর্ক তৈরি এবং ডেটার বিশ্বস্ততা (Referential Integrity) বজায় রাখার নিয়মই হলো Foreign Key। এটি নিশ্চিত করে যে চাইল্ড টেবিলে এমন কোনো রেফারেন্স আইডি বসবে না যা প্যারেন্ট টেবিলে নেই।

### 💡 বেস্ট প্র্যাকটিস ও অপ্টিমাইজেশন
* **Foreign Key Indexing:** ফরেইন কি কলামগুলোতে (যেমন: `customer_id`) সবসময় **Index** তৈরি করবেন। কারণ পরবর্তীতে জয়েন কুয়েরি চালানোর সময় ডেটাবেস এই কলামগুলোর ওপর ভিত্তি করে সার্চ করে। ইনডেক্স না থাকলে কুয়েরি স্লো হয়ে যাবে।
* বিজনেসের ধরন বুঝে `ON DELETE CASCADE` অথবা `ON DELETE SET NULL` ব্যবহার নির্ধারণ করুন।

---

## 15-9 to 15-12: All Joins Overview

| Join Type | Description |
| :--- | :--- |
| **INNER JOIN** | দুটি টেবিলের মধ্যেই মিল (Match) থাকা রো-গুলো শুধুমাত্র রিটার্ন করে। |
| **LEFT JOIN** | বামপাশের টেবিলের সব ডেটা এবং ডানপাশের টেবিলের শুধুমাত্র মিল থাকা ডেটা আনে। মিল না থাকলে ডানপাশে `NULL` বসে। |
| **RIGHT JOIN** | LEFT JOIN-এর ঠিক উল্টো। ডানপাশের সব ডেটা এবং বামপাশের মিল থাকা ডেটা আনে। |
| **FULL JOIN** | দুটি টেবিলের ম্যাচিং এবং নন-ম্যাচিং সমস্ত ডেটাই নিয়ে আসে। |
| **CROSS JOIN** | কার্তেসীয় গুণজ (Cartesian Product)। টেবিল ১ এর প্রতি রো-এর সাথে টেবিল ২ এর প্রতি রো-এর কম্বিনেশন তৈরি করে। |
| **NATURAL JOIN** | দুটি টেবিলের মধ্যে একই নামের কলামের ওপর ভিত্তি করে অটোমেটিক জয়েন করে। |

### 💡 বেস্ট প্র্যাকটিস ও অপ্টিমাইজেশন
* **Avoid SELECT \* :** জয়েন করার সময় কখনো `SELECT *` দিবেন না। এতে মেমোরি ও ব্যান্ডউইথ অপচয় হয়। শুধুমাত্র প্রয়োজনীয় কলামের নাম উল্লেখ করুন।
* **Avoid NATURAL JOIN :** প্রোডাকশন কোডে এটি ব্যবহার করা নিষিদ্ধ। কারণ ভবিষ্যতে টেবিলে কোনো কলাম যোগ করলে যদি নাম মিলে যায়, তবে পুরো কুয়েরির লজিক ব্রেক করবে।

---

## 🛠️ Practical Project Setup (Demo Database)

মডিউল ১৫-এর সমস্ত খুঁটিনাটি একসাথে প্র্যাকটিস করার জন্য নিচে একটি **Gadget E-commerce** ডেটাবেস স্কিমা এবং ডেমো ডেটা দেওয়া হলো:

### ১. টেবিল তৈরি (DDL Script)
```sql
-- 1. Customers Table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) -- NULL অনুমোদিত (COALESCE টেস্ট করার জন্য)
);

-- 2. Gadgets Table
CREATE TABLE gadgets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- 3. Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT,
    gadget_id INT,
    qty INT NOT NULL,
    discount NUMERIC(10, 2), -- NULL অনুমোদিত
    order_date DATE DEFAULT CURRENT_DATE,
    
    -- Foreign Key Constraints
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    CONSTRAINT fk_gadget FOREIGN KEY (gadget_id) REFERENCES gadgets(id) ON DELETE SET NULL
);

-- Scalability-র জন্য Foreign Key-তে ইনডেক্সিং
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_gadget_id ON orders(gadget_id);
২. ডেমো ডেটা ইনসার্ট (DML Script)
SQL
-- Customers (কিছু ইউজারের ফোন নাম্বার নেই)
INSERT INTO customers (name, phone) VALUES 
('Rahim Uddin', '01711000000'),
('Karim Hasan', NULL),
('Sumaiya Akter', '01822000000'),
('Nusrat Jahan', NULL),
('Masud Rana', '01933000000');

-- Gadgets
INSERT INTO gadgets (name, price, stock) VALUES 
('iPhone 15 Pro', 1200.00, 10),
('Samsung Galaxy S24', 950.00, 15),
('Sony WH-1000XM5', 350.00, 20),
('MacBook Air M3', 1100.00, 5),
('Logitech Mouse', 50.00, 100);

-- Orders (কিছু ডিসকাউন্ট NULL, এবং একজন গেস্ট কাস্টমার যার ID NULL)
INSERT INTO orders (customer_id, gadget_id, qty, discount) VALUES 
(1, 1, 1, 50.00),     
(1, 3, 2, NULL),      
(2, 2, 1, 20.00),     
(3, 4, 1, NULL),      
(3, 5, 3, 5.00),      
(1, 4, 1, 100.00),    
(NULL, 5, 10, NULL);  
🚀 Practice Queries & Use Cases
উপরের ডেটাসেটের ওপর ভিত্তি করে মডিউলের সব রিয়েল-ওয়ার্ল্ড কুয়েরি প্র্যাকটিস:

১. COALESCE দিয়ে বিলিং হিসেব (15-1)
ডিসকাউন্ট NULL হলেও যাতে ফাইনাল টোটালে ভুল না আসে:

SQL
SELECT 
    o.id AS order_id, 
    g.name AS product, 
    (g.price * o.qty) AS subtotal,
    COALESCE(o.discount, 0) AS discount,
    ((g.price * o.qty) - COALESCE(o.discount, 0)) AS final_invoice
FROM orders o
JOIN gadgets g ON o.gadget_id = g.id;
২. অর্ডার লিস্ট প্যাজিনেশন (15-2)
পেজ নাম্বার ২, যেখানে প্রতি পেজে ৩টি করে রেকর্ড থাকবে:

SQL
SELECT id, customer_id, qty, order_date 
FROM orders 
ORDER BY id ASC 
LIMIT 3 OFFSET 3;
৩. RETURNING সহ আপডেট এবং ডিলিট (15-3 & 15-4)
SQL
-- আপডেট টেস্ট
UPDATE orders 
SET qty = 5 
WHERE id = 1 
RETURNING id, gadget_id, qty AS updated_qty;

-- ডিলিট টেস্ট
DELETE FROM customers 
WHERE name = 'Masud Rana' 
RETURNING *;
৪. GROUP BY ও HAVING দিয়ে হাই-ভ্যালু কাস্টমার ফিল্টার (15-5 & 15-6)
যেসব কাস্টমার ১০০০ ডলারের বেশি কেনাকাটা করেছেন তাদের লিস্ট:

SQL
SELECT 
    c.name, 
    SUM((g.price * o.qty) - COALESCE(o.discount, 0)) AS total_spent
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN gadgets g ON o.gadget_id = g.id
GROUP BY c.name
HAVING SUM((g.price * o.qty) - COALESCE(o.discount, 0)) > 1000;
৫. Left Join দিয়ে নিষ্ক্রিয় কাস্টমার খোঁজা (15-10)
যারা অ্যাকাউন্ট খুলেছেন কিন্তু কোনো অর্ডার করেননি:

SQL
SELECT c.name, c.phone, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
৬. Right Join দিয়ে অবিক্রিত প্রোডাক্ট খোঁজা (15-11)
যেসব গ্যাজেট এখন পর্যন্ত একটিও বিক্রি হয়নি:

SQL
SELECT g.name AS unsold_product, g.price
FROM orders o
RIGHT JOIN gadgets g ON o.gadget_id = g.id
WHERE o.id IS NULL;