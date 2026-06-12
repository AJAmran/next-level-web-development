# Advanced SQL Concepts (PostgreSQL Focused)
---

### 16-4: Subquery Basics

একটি SQL কুয়েরির ভেতরে যখন অন্য আরেকটি কুয়েরি ব্যবহার করা হয়, তখন তাকে **Subquery** বা Inner Query বলা হয়।

* **Why (কেন):** অনেক সময় আমাদের এমন ডেটা দরকার হয় যা সরাসরি একবারে ফিল্টার করা যায় না। আগে একটা ইন্টারনাল হিসাব বের করতে হয়, তারপর সেই রেজাল্টের ওপর ভিত্তি করে মূল ডেটা টানতে হয়।
* **When (কখন):** যখন কোনো `WHERE`, `HAVING`, বা `FROM` ক্লজে অন্য কোনো টেবিলের অ্যাগ্রিগেশন বা ডাইনামিক ভ্যালুর ওপর নির্ভর করতে হয়।
* **How & Example:**
```sql
-- কর্মচারীদের ডেটা যাদের বেতন কোম্পানির গড় বেতনের চেয়ে বেশি
SELECT employee_name, salary 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);

```

```

---

### 16-5: Functions Explained
PostgreSQL-এ Function (Stored Function) হলো একগুচ্ছ SQL কোড, যা একটি নির্দিষ্ট কাজ করে এবং অবশ্যই একটি **নির্দিষ্ট ভ্যালু রিটার্ন করে**।

*   **Why (কেন):** একই লজিক বা কোড বারবার না লিখে কোডকে রিইউজেবল (Reusable) করার জন্য। এটি কুয়েরির পারফরম্যান্স বাড়ায়।
*   **When (কখন):** যখন কোনো নির্দিষ্ট হিসাব-নিকাশ বা ক্যালকুলেশন বারবার বিভিন্ন কুয়েরিতে ব্যবহার করার প্রয়োজন হয়।
*   **How & Example:**
    ```sql
    -- পণ্যের মূল দামের সাথে ১৫% ভ্যাট (VAT) যোগ করার ফাংশন
    CREATE OR REPLACE FUNCTION calculate_total_price(price NUMERIC)
    RETURNS NUMERIC AS $$
    BEGIN
        RETURN price + (price * 0.15);
    END;
    $$ LANGUAGE plpgsql;

    -- ব্যবহার করার নিয়ম:
    SELECT calculate_total_price(100); -- রিটার্ন করবে: 115.00

```

---

### 16-6 & 16-7: Procedure Examples

Procedure এবং Function-এর মধ্যে মূল পার্থক্য হলো: Function সবসময় ভ্যালু রিটার্ন করে, কিন্তু Procedure কোনো ভ্যালু রিটার্ন করে না। তবে Procedure-এর সবচেয়ে বড় সুবিধা হলো, এর ভেতরে **Transactions (COMMIT / ROLLBACK)** কন্ট্রোল করা যায়।

* **Why (কেন):** ডেটাবেজে কোনো জটিল বা একাধিক অ্যাকশন (যেমন: ইনসার্ট, আপডেট, ডিলিট) একসাথে করার জন্য এবং ট্রানজেকশন সেফটি নিশ্চিত করার জন্য।
* **When (কখন):** যখন আপনার কোনো ভ্যালু ব্যাক পাওয়ার দরকার নেই, বরং ডেটাবেজের ডেটা মডিফাই করা এবং ক্র্যাশ বা এরর হলে পুরো প্রসেস রোলব্যাক করা প্রধান লক্ষ্য।

#### Example 1 (Money Transfer):

```sql
CREATE OR REPLACE PROCEDURE transfer_money(sender_id INT, receiver_id INT, amount NUMERIC) 
AS $$
BEGIN
    -- প্রেরকের অ্যাকাউন্ট থেকে টাকা কাটা
    UPDATE accounts SET balance = balance - amount WHERE id = sender_id;
    -- প্রাপকের অ্যাকাউন্টে টাকা যোগ করা
    UPDATE accounts SET balance = balance + amount WHERE id = receiver_id;
    
    COMMIT; -- ট্রানজেকশন সফলভাবে সেভ করা হলো
END;
$$ LANGUAGE plpgsql;

-- রান করার নিয়ম:
CALL transfer_money(1, 2, 500.00);

```

#### Example 2 (Business Logic with Validation):

```sql
CREATE OR REPLACE PROCEDURE grant_bonus(emp_id INT, bonus_amount NUMERIC)
AS $$
BEGIN
    -- ৫০০০ এর বেশি বোনাস হলে প্রসেস বাতিল হবে
    IF bonus_amount > 5000 THEN
        RAISE EXCEPTION 'বোনাসের পরিমাণ ৫০০০ এর বেশি হতে পারবে না!'; -- অটোমেটিক রোলব্যাক হবে
    END IF;

    UPDATE employees SET salary = salary + bonus_amount WHERE id = emp_id;
    COMMIT;
END;
$$ LANGUAGE plpgsql;

```

---

### 16-8 & 16-9: Trigger Example & Writing Triggers

Trigger হলো একটি বিশেষ স্বয়ংক্রিয় প্রোগ্রাম, যা ডেটাবেজের কোনো টেবিলে `INSERT`, `UPDATE`, বা `DELETE` হওয়ার সাথে সাথে **নিজে নিজেই ব্যাকগ্রাউন্ডে রান হয়**।
PostgreSQL-এ ট্রিগার লিখতে হলে প্রথমে একটি **Trigger Function** তৈরি করতে হয়, তারপর সেটিকে মূল টেবিলের সাথে যুক্ত করতে হয়।

* **Why (কেন):** ডেটার নিরাপত্তা নিশ্চিত করতে, অডিট লগ রাখতে (কে কখন কী পরিবর্তন বা ডিলিট করল) এবং বিজনেস রুলস অটোমেট করতে।
* **When (কখন):** যখন কোনো টেবিলে ডেটা পরিবর্তনের সাথে সাথে অন্য টেবিলে অটোমেটিক কোনো রেকর্ড বা অ্যাকশন নেওয়ার প্রয়োজন হয়।
* **How & Example (Audit Logging):**
```sql
-- ধাপ ১: ট্রিগার ফাংশন তৈরি
CREATE OR REPLACE FUNCTION log_deleted_product()
RETURNS TRIGGER AS $$
BEGIN
    -- OLD কিওয়ার্ড দিয়ে ডিলিট হওয়া ডেটাকে নির্দেশ করা হয়
    INSERT INTO deleted_products_log(product_id, product_name, deleted_at)
    VALUES (OLD.id, OLD.name, NOW());
    RETURN OLD; 
END;
$$ LANGUAGE plpgsql;

-- 🔍 ধাপ ২: ট্রিগারটি নির্দিষ্ট টেবিলের সাথে যুক্ত করা
CREATE TRIGGER product_delete_trigger
AFTER DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION log_deleted_product();

```



```

---

### 16-10: Indexing Explained
বইয়ের শুরুতে যেমন সূচিপত্র (Index) থাকে যার কারণে পুরো বই না খুঁজে সরাসরি নির্দিষ্ট চ্যাপ্টারে যাওয়া যায়, ডেটাবেজের Index-ও ঠিক সেই কাজটাই করে। এটি ডেটা খোঁজার গতি বহুগুণ বাড়িয়ে দেয়।

*   **Why (কেন):** কোটি কোটি ডেটার মধ্য থেকে চোখের পলকে নির্দিষ্ট ডেটা খুঁজে বের করার জন্য। ইনডেক্স না থাকলে ডেটাবেজ **Sequential Scan** (ধীরগতির খোঁজ) করে। ইনডেক্স থাকলে সরাসরি নির্দিষ্ট মেমোরি অ্যাড্রেসে চলে যায়।
*   **When (কখন):** যে কলামগুলো `WHERE` ক্লজে, `JOIN` কন্ডিশনে অথবা `ORDER BY`-তে সবচেয়ে বেশি ব্যবহৃত হয়। *(সতর্কতা: অতিরিক্ত ইনডেক্স তৈরি করলে INSERT/UPDATE স্লো হয়, তাই বুঝেশুনে ইনডেক্স করতে হয়)*।
*   **How & Example:**
    ```sql
    -- ইমেইল কলামের ওপর B-Tree (ডিফল্ট) ইনডেক্স তৈরি
    CREATE INDEX idx_users_email ON users(email);

    -- ইনডেক্স কাজ করছে কিনা বা কত দ্রুত কাজ করছে তা দেখার উপায়:
    EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'rahim@email.com';

```