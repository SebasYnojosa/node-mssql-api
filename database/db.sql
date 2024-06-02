-- CREATE DATABASE webstore

USE webstore

CREATE TABLE products( 
    id INT IDENTITY(1, 1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2),
    quantity INT,
    description TEXT
)