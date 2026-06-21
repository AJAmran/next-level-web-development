---

# 📘 Prisma ORM Core Concepts — সুন্দর নোট (জুন ২০২৬)

---

## ১. ডেটা মডেলিং (Data Modeling)
**কী জিনিস:** বাস্তব সমস্যাকে টেবিল ও সম্পর্কে রূপান্তর করা।  
**ভালো:** আগে প্ল্যান করো, সম্পর্ক বুঝে নাও, ভবিষ্যতের কথা ভাবো।  
**খারাপ:** না ভেবে কোডিং, সব ফিল্ড এক টেবিলে গুঁজে দেওয়া, অপ্রয়োজনীয় নরমালাইজেশন।

---

## ২. প্রিজমা স্কিমা ওভারভিউ
**তিন অংশ:**
```prisma
datasource db { ... }   // ডেটাবেজ কানেকশন
generator client { ... } // ক্লায়েন্ট জেনারেটর
model User { ... }       // টেবিল
```
একটাই ফাইল `prisma/schema.prisma` — এটাই সত্যের উৎস।

---

## ৩. ডেটা সোর্স ও জেনারেটর
```prisma
datasource db {
  provider = "postgresql"  
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```
✅ ভালো: `env()` দিয়ে সিক্রেট বাইরে রাখা  
❌ খারাপ: সরাসরি URL লেখা, গিটে পুশ করা

---

## ৪. মডেল ডিফাইন (বেসিক)
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
**প্রায় ম্যান্ডেটরি ফিল্ড:** `id`, `createdAt`, `updatedAt`  
✅ ভালো: সারোগেট কী, অটো টাইমস্ট্যাম্প  
❌ খারাপ: ইমেইলকে প্রাইমারি কী বানানো

---

## ৫. ফিল্ড টাইপ ও অ্যাট্রিবিউট
### স্কেলার টাইপ:
`Int`, `String`, `Boolean`, `Float`, `DateTime`, `BigInt`, `Decimal`, `Json`, `Bytes`, `Unsupported`

### গুরুত্বপূর্ণ অ্যাট্রিবিউট:
| অ্যাট্রিবিউট | কাজ |
|---------------|-----|
| `@id` | একক প্রাইমারি কী |
| `@unique` | ইউনিক কনস্ট্রেইন্ট |
| `@default(now())` | ডিফল্ট ভ্যালু |
| `@updatedAt` | শেষ আপডেটের সময় অটো |
| `@ignore` | ক্লায়েন্টে দেখা যাবে না |
| `@map("col")` | ফিজিক্যাল কলামের নাম ম্যাপ |
| `@db.VarChar(255)` | নেটিভ টাইপ দেওয়া |

✅ ভালো: `@db.VarChar(length)` দিয়ে লিমিট, `@updatedAt` ব্যবহার  
❌ খারাপ: স্ট্রিং লিমিট ছাড়া, দরকারি ফিল্ডে `@ignore` ভুলে দেওয়া

---

## ৬. এনাম ও কম্পোজিট কী

### এনাম
```prisma
enum Role { USER ADMIN MODERATOR }
model User { role Role @default(USER) }
```
✅ সীমিত, পরিবর্তন না হওয়া অপশনে এনাম  
❌ ঘন ঘন বদলায় এমন ভ্যালুর জন্য এনাম (টেবিল ভালো)

### কম্পোজিট কী
```prisma
model CategoryTranslation {
  categoryId Int
  language   String
  name       String
  @@id([categoryId, language])   // composite PK
  // বা @@unique([categoryId, language])
}
```
✅ জাংশন টেবিলে কম্পোজিট PK, `@@index` দিয়ে পারফরম্যান্স  
❌ অপ্রয়োজনীয় ফিল্ড দিয়ে কম্পোজিট কী বানানো

---

## ৭. রিলেশন — এক নজরে

### ১:১ (One-to-One)
```prisma
model User { profile Profile? }
model Profile {
  userId Int @unique  // ⭐ এটাই ১:১ নিশ্চিত করে
  user   User @relation(fields: [userId], references: [id])
}
```
✅ FK-তে `@unique`  
❌ ফরগট করলে ১:১ থাকে না

### ১:M (One-to-Many)
```prisma
model User { posts Post[] }
model Post { authorId Int; author User @relation(fields: [authorId], references: [id]) }
```
✅ "Many" পাশে FK  
❌ রিলেশন ভুলে FK-কে কেবল Int রাখা

### M:M (Many-to-Many)
**ইমপ্লিসিট (সিম্পল)**
```prisma
model Post { tags Tag[] }
model Tag  { posts Post[] }
```
✅ জাংশনে এক্সট্রা ফিল্ড না থাকলে  
❌ পরে দরকার হলে কষ্ট

**এক্সপ্লিসিট (কাস্টম)**
```prisma
model Post { tags PostTag[] }
model Tag  { posts PostTag[] }
model PostTag {
  postId Int; tagId Int
  post Post @relation(fields: [postId], references: [id])
  tag  Tag  @relation(fields: [tagId], references: [id])
  @@id([postId, tagId])    // extra fields like assignedAt
}
```
✅ যেখানে জাংশনে মেটাডেটা দরকার

### সেলফ রিলেশন
```prisma
model Employee {
  id         Int @id
  managerId  Int?
  manager    Employee?  @relation("Management", fields: [managerId], references: [id])
  subordinates Employee[] @relation("Management")
}
```
✅ রিলেশনের নাম দাও, FK অপশনাল রাখো (সবচেয়ে উপরের জন্য)  
❌ নাম ছাড়া কনফিউশন

---

## ৮. রেফারেন্সিয়াল অ্যাকশন (onDelete / onUpdate)

| অ্যাকশন | আচরণ | কখন ব্যবহার করবে |
|----------|------|-------------------|
| `Cascade` | প্যারেন্ট ডিলিট/আপডেট → চাইল্ডও একই | চাইল্ড প্যারেন্ট ছাড়া অর্থহীন (Post → Comment) |
| `Restrict` | চাইল্ড থাকলে প্যারেন্ট ডিলিট ব্লক | গুরুত্বপূর্ণ ডেটা রক্ষা (Category → Products) |
| `NoAction` | ডেটাবেজের ডিফল্ট (বেশিরভাগ Restrict-এর মতো) | খুব কম, নিজের দায়িত্ব |
| `SetNull` | FK-তে NULL (ফিল্ড অপশনাল হতে হবে) | সম্পর্কচ্ছেদ করলেও চাইল্ড থাকবে (Profile userId) |
| `SetDefault` | FK-তে ডিফল্ট মান | খুব নির্দিষ্ট প্রয়োজন |

```prisma
model Post {
  authorId Int
  author   User @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```
✅ প্রতিটি রিলেশনে স্পষ্ট করে রেফ অ্যাকশন দেওয়া  
❌ সব জায়গায় `Cascade` দিয়ে রাখা (পুরো চেইন ভেঙে যেতে পারে)

---

## 🌟 সোনালী চেকলিস্ট
- [ ] প্রতিটি টেবিলে `id` (অটোইনক্রিমেন্ট/UUID)
- [ ] `createdAt` ও `updatedAt` টাইমস্ট্যাম্প
- [ ] FK ফিল্ড এবং `@relation` ক্লিয়ারলি উল্লেখ
- [ ] `onDelete` / `onUpdate` জেনেশুনে বাছাই
- [ ] এনাম ও ডিফল্ট ভ্যালু দেয়া
- [ ] `@map` / `@@map` দিয়ে ডেটাবেজে নাম গুছানো
- [ ] দরকারি ইনডেক্স `@@index`
- [ ] সংবেদনশীল ডেটা `env()` দিয়ে বাইরে
- [ ] সব টেবিল ফিজিক্যালি যেন বোধগম্য হয়

---