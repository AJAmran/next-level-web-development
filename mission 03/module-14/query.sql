--Display all books with their titles and prices, ordered by price (lowest to highest)
select
  title,
  price
from
  books
order by
  price asc
  -- Find all distinct countries where customers are from
select distinct
  country
from
  customers
  -- Find all books whose titles start with "The"
select
  *
from
  books
where
  title ilike 'the%'
  --Change the column name first_name to customer_first_name in the customers table
alter table customers
rename column first_name to customer_first_name
--Find all books in the Fantasy genre
select
  *
from
  books
where
  genre = 'Fanasy'
  --Count the total number of orders in the database
select
  sum(quantity) as total_orders
from
  orders
  --Find the average price of books by genre, but only show genres with an average price greater than $14
select
  genre,
  round(avg(price), 2)
from
  books
group by
  genre
having
  avg(price) > 14


--Find all customers whose email addresses end with .com and are from either USA or UK

select * from customers
where email ilike '%.com' and country in('USA', 'UK')


--
select 
  upper(customer_first_name|| ' ' || last_name) as fullName,
  email,
  lower(city) as City
  from customers
where country in('USA', 'UK')




SELECT
  SUM(total_amount) AS total_revenue,
  round(AVG(total_amount), 2) AS avg_order_value,
  MAX(total_amount) AS highest_order,
  MIN(total_amount) AS lowest_order
FROM orders
where order_date between '2023-06-01' AND '2023-06-30';

