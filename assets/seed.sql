DROP DATABASE IF EXISTS open_employee_db;
CREATE DATABASE open_employee_db;

USE open_employee_db;

CREATE TABLE role (
id int (10) NOT NUll auto_increment,
title varchar(30),
salary dec(8,2),
-- I am assuming salary is hourly, US Dollars
-- may change this
-- no job description implemented
PRIMARY KEY (id)
);
CREATE TABLE department (
id int (10) NOT NUll auto_increment,
name varchar(30),
department_id int(10),
PRIMARY KEY (id)
);
CREATE TABLE employee (
id int NOT NUll auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int(10),
manager_id int (10) NULL,
PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM role;

-- testing

