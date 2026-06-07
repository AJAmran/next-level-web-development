-- create database
CREATE DATABASE online_bookstore;

-- create table
CREATE TABLE
  customers (
    customer_id int PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(100),
    city varchar(50),
    country varchar(50),
    registration_date date
  )
CREATE TABLE
  books (
    book_id int PRIMARY KEY,
    title varchar(200),
    author varchar(100),
    genre varchar(50),
    price decimal(10, 2),
    publication_year int,
    stock_quantity int
  )
CREATE TABLE
  orders (
    order_id int PRIMARY KEY,
    customer_id int REFERENCES customers (customer_id),
    book_id int REFERENCES books (book_id),
    order_date date,
    quantity int,
    total_amount decimal(10, 2)
  )