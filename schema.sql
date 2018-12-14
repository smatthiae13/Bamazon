CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

	id INT AUTO_INCREMENT PRIMARY KEY
    product_name VARCHAR (255) NOT NULL,
    department_name VARCHAR (255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL,
    
    );


SELECT * FROM products;