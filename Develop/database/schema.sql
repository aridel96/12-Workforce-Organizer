DROP DATABASE IF EXIST emp_tracker_db;          -- Checks to see if the database exist already. If it does it drops the database meaning 
                                                -- it deletes the database, it's tables and the data inside.

CREATE DATABASE emp_tracker_db;                 -- Creates the database

USE emp_tracker_db;                             -- Allows us to use the databasr and interact with it

CREATE TABLE department (                       -- Creates the tables 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);