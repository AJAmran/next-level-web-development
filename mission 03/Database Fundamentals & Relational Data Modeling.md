# Database Design & ER Diagram Notes (Beginner → Advanced)

---

# 1. Purpose of Database Design (ডাটাবেজ ডিজাইনের উদ্দেশ্য)

## Database Design কী?

Database Design হলো এমন একটি প্রক্রিয়া যেখানে Business Requirements বিশ্লেষণ করে Database-এর Structure তৈরি করা হয় যাতে Data সঠিকভাবে Store, Retrieve এবং Manage করা যায়।

---

## কেন Database Design দরকার?

### 1. Data Redundancy কমানোর জন্য

খারাপ ডিজাইন:

| StudentID | StudentName | Course |
| --------- | ----------- | ------ |
| 101       | Amran       | DBMS   |
| 101       | Amran       | OOP    |

Student Name বারবার Store হচ্ছে।

---

ভালো ডিজাইন:

**Students**

| StudentID | StudentName |
| --------- | ----------- |
| 101       | Amran       |

**Courses**

| CourseID | CourseName |
| -------- | ---------- |
| C01      | DBMS       |

---

### 2. Data Consistency বজায় রাখার জন্য

একই Data বিভিন্ন জায়গায় Store থাকলে Confusion তৈরি হয়।

উদাহরণ:

```
Amran
AMRAN
Md Amran
```

Proper Design এটি Prevent করে।

---

### 3. Faster Query Performance

ভালো Structure থাকলে Data দ্রুত খুঁজে পাওয়া যায়।

---

### 4. Data Integrity নিশ্চিত করা

Database ভুল Data Insert হওয়া থেকে রক্ষা করে।

উদাহরণ:

```
Age = -20
```

এটি Invalid Data।

---

### 5. Future Scalability

আজ 100 User,
আগামী বছর 10 Million User।

ভালো Design Scale করতে সাহায্য করে।

---

# 2. Database Design Process

Database Design সাধারণত 6 Step এ করা হয়।

```
Requirements Analysis
        ↓
Determine Entities
        ↓
Determine Attributes
        ↓
Determine Relationships
        ↓
Resolve Many-to-Many
        ↓
Create ER Diagram
        ↓
Create Tables
```

---

# 3. Determining Entities

## Entity কী?

যে কোন Object, Person, Place অথবা Thing যার সম্পর্কে Data Store করতে হবে তাকে Entity বলে।

---

## Real World Example

E-Commerce System

```
Customer
Product
Order
Category
Payment
```

সবগুলো Entity।

---

## Entity Identification Rule

নিজেকে প্রশ্ন করো:

> "কোন কোন জিনিস সম্পর্কে তথ্য সংরক্ষণ করতে হবে?"

---

### University Example

```
Student
Teacher
Course
Department
```

সবগুলো Entity।

---

## Entity Representation

ER Diagram-এ Entity Rectangle দ্বারা প্রকাশ করা হয়।

```
+-----------+
| Student   |
+-----------+
```

---

# 4. Determining Attributes for Each Entity

## Attribute কী?

Entity-এর Properties বা Characteristics কে Attribute বলে।

---

## Example

Student Entity

```
Student
 ├── StudentID
 ├── Name
 ├── Email
 ├── Phone
 └── DOB
```

---

## ER Diagram Representation

```
          Name
            |
            |
Student ----|
            |
          Email
```

বাস্তবে Oval দিয়ে দেখানো হয়।

---

## Types of Attributes

### Simple Attribute

```
Name
Age
Gender
```

---

### Composite Attribute

ভাঙা যায়।

```
Address
 ├── City
 ├── State
 └── Country
```

---

### Multi-Valued Attribute

একাধিক Value থাকতে পারে।

```
Phone Numbers
```

```
017xxxxxxx
018xxxxxxx
019xxxxxxx
```

---

### Derived Attribute

অন্য Attribute থেকে Calculate হয়।

```
DOB → Age
```

---

# 5. Relationships Among Entities

## Relationship কী?

দুই বা ততোধিক Entity-এর মধ্যে Connection-কে Relationship বলে।

---

Example:

```
Student Enrolls Course
```

এখানে

```
Student ←→ Course
```

Relationship আছে।

---

## ER Diagram Representation

```
+---------+      Enrolls      +--------+
| Student |-------------------| Course |
+---------+                   +--------+
```

---

# 6. Relationship Cardinality

## Cardinality কী?

এক Entity-এর কতগুলো Record অন্য Entity-এর কতগুলো Record-এর সাথে যুক্ত হতে পারে তা Cardinality বলে।

---

# One-to-One (1:1)

একজন Person-এর একটি Passport।

```
Person -------- Passport
   1                1
```

---

Example

| Person | Passport |
| ------ | -------- |
| A      | P1       |
| B      | P2       |

---

## ER Diagram

```
Person 1 -------- 1 Passport
```

---

# One-to-Many (1:N)

এক Department-এ অনেক Student থাকতে পারে।

```
Department ------ Student
     1              N
```

---

Example

```
CSE
 ├── Student1
 ├── Student2
 ├── Student3
```

---

## ER Diagram

```
Department 1 -------- N Student
```

---

# Many-to-One (N:1)

অনেক Student একটি Department-এর অন্তর্ভুক্ত।

```
Student N -------- 1 Department
```

---

Example

```
Student1 → CSE
Student2 → CSE
Student3 → CSE
```

---

# Many-to-Many (N:N)

এক Student অনেক Course নিতে পারে।

এক Course অনেক Student নিতে পারে।

```
Student N -------- N Course
```

---

Example

```
Student1 → DBMS
Student1 → OOP

Student2 → DBMS
Student2 → OOP
```

---

## ER Diagram

```
Student N -------- N Course
```

---

# Relationship Cardinality Signs (Crow's Foot Notation)

---

## One

```
|
```

---

## Many

```
<<
```

(বাস্তবে Crow's Foot)

---

## Zero or One

```
O|
```

---

## One or Many

```
|<
```

---

## Zero or Many

```
O<
```

---

## Many to Many

```
<--------<
```

---

# Cardinality Symbol Summary

| Symbol | Meaning      |
| ------ | ------------ |
| |      | One          |
| O|     | Zero or One  |
| |<     | One or Many  |
| O<     | Zero or Many |
| <      | Many         |

---

# 7. Resolving Many-to-Many Relationship

## Problem

Database সরাসরি Many-to-Many Support করে না।

---

Example

```
Student ↔ Course
```

```
Many ↔ Many
```

---

## Solution

একটি Junction Table তৈরি করতে হবে।

---

Before:

```
Student N -------- N Course
```

---

After:

```
Student
    |
    |
    |
Enrollment
    |
    |
Course
```

---

## ER Diagram

```
+---------+
| Student |
+---------+
     |
     |
     |
+------------+
| Enrollment |
+------------+
     |
     |
     |
+--------+
| Course |
+--------+
```

---

## Enrollment Table

| EnrollmentID | StudentID | CourseID |
| ------------ | --------- | -------- |
| 1            | 101       | C01      |
| 2            | 101       | C02      |
| 3            | 102       | C01      |

---

## Result

```
Student 1 ---- N Enrollment
Course 1 ---- N Enrollment
```

দুটি One-to-Many Relationship হয়ে গেল।

---

# 8. Entity Relationship (ER) Diagram

## ER Diagram কী?

Database-এর Visual Blueprint।

Database তৈরির আগে Structure Design করার জন্য ER Diagram ব্যবহার করা হয়।

---

## Components of ER Diagram

### Entity

Rectangle

```
+---------+
| Student |
+---------+
```

---

### Attribute

Oval

```
     Name
       |
       |
+---------+
| Student |
+---------+
```

---

### Relationship

Diamond

```
Student ◇ Enrolls ◇ Course
```

---

# Complete ER Diagram Example (University)

```text
                +-----------+
                | Student   |
                +-----------+
                | StudentID |
                | Name      |
                | Email     |
                +-----------+
                      |
                      |
                    Enrolls
                      |
                      |
                +-----------+
                | Enrollment|
                +-----------+
                | EnrollID  |
                | StudentID |
                | CourseID  |
                +-----------+
                      |
                      |
                    Belongs
                      |
                      |
                +-----------+
                | Course    |
                +-----------+
                | CourseID  |
                | Name      |
                +-----------+
```

---

# Quick Revision Sheet

| Topic          | Definition                        |
| -------------- | --------------------------------- |
| Entity         | যার সম্পর্কে Data Store করা হয়   |
| Attribute      | Entity-এর Property                |
| Relationship   | Entity-এর Connection              |
| Cardinality    | কত Record কত Record-এর সাথে যুক্ত |
| 1:1            | One to One                        |
| 1:N            | One to Many                       |
| N:1            | Many to One                       |
| N:N            | Many to Many                      |
| Junction Table | Many-to-Many Resolve করার Table   |
| ER Diagram     | Database Blueprint                |

---

# Interview Questions

### Q1. Entity কী?

Data Store করার জন্য ব্যবহৃত Object বা Thing।

### Q2. Attribute কী?

Entity-এর Property।

### Q3. Cardinality কী?

দুই Entity-এর Relationship-এর Quantity।

### Q4. N:N Relationship কীভাবে Resolve করা হয়?

Junction/Bridge Table ব্যবহার করে।

### Q5. ER Diagram কেন ব্যবহার করা হয়?

Database তৈরি করার আগে Structure Visualize করার জন্য।

### Q6. Student-Course Relationship কোন Cardinality?

Many-to-Many (N:N)

### Q7. Department-Student Relationship কোন Cardinality?

One-to-Many (1:N)

---



# Database Keys + Complete E-Commerce Database Design Notes

---

# Part 1: Database Keys

---

# What is a Key?

Database Key হলো এমন একটি Attribute অথবা Attribute-এর Combination যা Table-এর Record-কে Uniquely Identify করে।

ধরো:

| StudentID | Name  | Email                                     |
| --------- | ----- | ----------------------------------------- |
| 101       | Amran | [amran@gmail.com](mailto:amran@gmail.com) |
| 102       | Rahim | [rahim@gmail.com](mailto:rahim@gmail.com) |

এখানে StudentID এবং Email উভয়ই একজন Student-কে আলাদা করে চিনতে পারে।

---

# 1. Super Key

## Definition

যেকোন Attribute অথবা Attribute-এর Combination যা একটি Row-কে Uniquely Identify করতে পারে তাকে Super Key বলে।

---

### Example

Student Table

| StudentID | Name  | Email                                     |
| --------- | ----- | ----------------------------------------- |
| 101       | Amran | [amran@gmail.com](mailto:amran@gmail.com) |
| 102       | Rahim | [rahim@gmail.com](mailto:rahim@gmail.com) |

Possible Super Keys:

```text
StudentID

Email

StudentID + Name

StudentID + Email

Email + Name

StudentID + Name + Email
```

সবগুলোই Unique।

---

## Important

Every Candidate Key is a Super Key

But

Every Super Key is NOT Candidate Key

---

# 2. Candidate Key

## Definition

Minimum Attribute ব্যবহার করে যদি Record Uniquely Identify করা যায় তাহলে সেটি Candidate Key।

---

Example:

```text
StudentID
Email
```

দুটিই Candidate Key।

কারণ:

```text
Unique
Minimal
```

---

Not Candidate Key:

```text
StudentID + Name
```

কারণ StudentID একাই Unique।

---

# Candidate Key Rule

```text
Unique
+
Minimal
```

---

# 3. Primary Key (PK)

## Definition

Candidate Keys-এর মধ্যে যেটিকে Official Identifier হিসেবে নির্বাচন করা হয় তাকে Primary Key বলে।

---

Example

Student Table

| StudentID(PK) | Name  |
| ------------- | ----- |
| 101           | Amran |
| 102           | Rahim |

---

Characteristics

### Unique

```text
101
102
103
```

---

### Not Null

```text
NULL ❌
```

---

### One Table → One Primary Key

```text
✔ StudentID

✖ StudentID + Another PK
```

---

## ER Diagram

```text
+----------------+
| Student        |
+----------------+
| PK StudentID   |
| Name           |
| Email          |
+----------------+
```

---

# 4. Alternate Key

## Definition

Candidate Key যেটি Primary Key হিসেবে Selected হয়নি।

---

Example

Candidate Keys:

```text
StudentID
Email
```

Selected PK:

```text
StudentID
```

Then:

```text
Email = Alternate Key
```

---

## Visualization

```text
Candidate Keys
    |
    |
    +---- Primary Key
    |
    +---- Alternate Key
```

---

# 5. Foreign Key (FK)

## Definition

এক Table-এর Primary Key যখন অন্য Table-এ ব্যবহৃত হয় তখন তাকে Foreign Key বলে।

---

Example

### Customers

| CustomerID(PK) | Name  |
| -------------- | ----- |
| 1              | Amran |
| 2              | Rahim |

---

### Orders

| OrderID | CustomerID(FK) |
| ------- | -------------- |
| 1001    | 1              |
| 1002    | 2              |

---

## Relationship

```text
Customers
    |
    | PK
    |
CustomerID
    |
    |
    V
Orders
    |
CustomerID (FK)
```

---

## Purpose

Maintains Referential Integrity

---

Invalid Insert

```text
CustomerID = 999
```

যদি Customer না থাকে।

❌ Reject

---

# 6. Composite Key

## Definition

দুই বা ততোধিক Attribute মিলে Primary Key তৈরি করলে তাকে Composite Key বলে।

---

Example

Enrollment Table

| StudentID | CourseID |
| --------- | -------- |
| 101       | DBMS     |
| 101       | OOP      |

---

PK

```text
(StudentID, CourseID)
```

---

ER Representation

```text
PK
----------------
StudentID
CourseID
```

---

# 7. Surrogate Key

## Definition

Artificially Generated Key।

Business Meaning নেই।

---

Example

```text
OrderID = 1001
OrderID = 1002
OrderID = 1003
```

---

Usually:

```sql
AUTO_INCREMENT
IDENTITY
UUID
```

---

Example

| OrderID | Product |
| ------- | ------- |
| 1001    | Laptop  |
| 1002    | Mouse   |

---

OrderID হলো Surrogate Key

---

# 8. Natural Key

## Definition

Real World Data যেটি নিজেই Unique।

---

Examples

```text
NID Number

Passport Number

Email Address

Driving License Number
```

---

Example

| Email                             |
| --------------------------------- |
| [a@gmail.com](mailto:a@gmail.com) |
| [b@gmail.com](mailto:b@gmail.com) |

---

Email হলো Natural Key।

---

# Key Relationship Summary

```text
Super Key
    |
    +-------------------+
    |                   |
Candidate Key       Other Super Keys
    |
    |
    +---------+
    |         |
Primary   Alternate
```

---

# Quick Comparison Table

| Key Type      | Unique     | Minimal          | Selected     |
| ------------- | ---------- | ---------------- | ------------ |
| Super Key     | Yes        | No               | No           |
| Candidate Key | Yes        | Yes              | No           |
| Primary Key   | Yes        | Yes              | Yes          |
| Alternate Key | Yes        | Yes              | No           |
| Foreign Key   | No         | No               | Relationship |
| Composite Key | Yes        | Multiple Columns | Optional     |
| Natural Key   | Real Data  | Yes              | Optional     |
| Surrogate Key | Artificial | Yes              | Optional     |

---

# Part 2: Complete E-Commerce Database Design

---

# Business Requirements

System must support:

```text
Customers

Products

Categories

Orders

Order Items

Payments

Reviews

Wishlist

Cart

Addresses
```

---

# Step 1: Determine Entities

```text
Customer

Address

Category

Product

Cart

CartItem

Order

OrderItem

Payment

Review

Wishlist
```

---

# Step 2: Entity Attributes

---

## Customer

```text
CustomerID (PK)

Name

Email

Phone

Password

CreatedAt
```

---

## Address

```text
AddressID (PK)

CustomerID (FK)

City

Country

ZipCode

Street
```

---

## Category

```text
CategoryID (PK)

Name

Description
```

---

## Product

```text
ProductID (PK)

CategoryID (FK)

Name

Price

Stock

Image

Description
```

---

## Cart

```text
CartID (PK)

CustomerID (FK)

CreatedAt
```

---

## CartItem

```text
CartItemID (PK)

CartID (FK)

ProductID (FK)

Quantity
```

---

## Order

```text
OrderID (PK)

CustomerID (FK)

AddressID (FK)

OrderDate

Status

TotalAmount
```

---

## OrderItem

```text
OrderItemID (PK)

OrderID (FK)

ProductID (FK)

Price

Quantity
```

---

## Payment

```text
PaymentID (PK)

OrderID (FK)

Method

Amount

Status

TransactionID
```

---

## Review

```text
ReviewID (PK)

CustomerID (FK)

ProductID (FK)

Rating

Comment
```

---

## Wishlist

```text
WishlistID (PK)

CustomerID (FK)

ProductID (FK)
```

---

# Step 3: Cardinality

---

## Customer → Address

```text
1 : N
```

One Customer

Many Addresses

---

## Category → Product

```text
1 : N
```

---

## Customer → Cart

```text
1 : 1
```

---

## Cart → CartItem

```text
1 : N
```

---

## Product → CartItem

```text
1 : N
```

---

## Customer → Order

```text
1 : N
```

---

## Order → OrderItem

```text
1 : N
```

---

## Product → OrderItem

```text
1 : N
```

---

## Order → Payment

```text
1 : 1
```

---

## Customer → Review

```text
1 : N
```

---

## Product → Review

```text
1 : N
```

---

# Resolving Many-to-Many Relationships

---

## Customer ↔ Product (Wishlist)

Before

```text
Customer N ↔ N Product
```

After

```text
Customer
    |
Wishlist
    |
Product
```

---

## Order ↔ Product

Before

```text
Order N ↔ N Product
```

After

```text
Order
   |
OrderItem
   |
Product
```

---

## Cart ↔ Product

Before

```text
Cart N ↔ N Product
```

After

```text
Cart
  |
CartItem
  |
Product
```

---

# Complete E-Commerce ER Diagram

```text
+-------------+
| Customer    |
+-------------+
| PK CustomerID
| Name
| Email
+-------------+
       |
       | 1
       |
       | N
+-------------+
| Address     |
+-------------+

       |
       |
       | 1
       |
       | N
+-------------+
| Order       |
+-------------+
| PK OrderID
| FK CustomerID
+-------------+
       |
       |
       | 1
       |
       | N
+-------------+
| OrderItem   |
+-------------+
| FK OrderID
| FK ProductID
+-------------+
       |
       |
       | N
       |
       | 1
+-------------+
| Product     |
+-------------+
| PK ProductID
| FK CategoryID
+-------------+
       |
       |
       | N
       |
       | 1
+-------------+
| Category    |
+-------------+

Product
   |
   | 1
   |
   | N
Review
   |
   | N
   |
   | 1
Customer

Customer
   |
Wishlist
   |
Product

Customer
   |
Cart
   |
CartItem
   |
Product

Order
   |
Payment
```

---

# Interview Questions

### Q1. Difference Between Candidate Key and Primary Key?

Candidate Key = Possible Unique Identifier

Primary Key = Selected Candidate Key

---

### Q2. Difference Between Natural Key and Surrogate Key?

Natural Key:

```text
Email
NID
Passport
```

Surrogate Key:

```text
CustomerID
OrderID
UUID
```

---

### Q3. Why Foreign Key is Important?

Referential Integrity Maintain করে।

---

### Q4. Why OrderItem Table Needed?

Order ↔ Product Many-to-Many Resolve করার জন্য।

---

### Q5. Why CartItem Table Needed?

Cart ↔ Product Many-to-Many Resolve করার জন্য।

---

### Q6. Which Keys Are Most Common in Production?

```text
Primary Key

Foreign Key

Composite Key

Surrogate Key (UUID)

Candidate Key

Unique Key
```