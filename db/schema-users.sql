/* 
  Creates the users table TODO: This came from cats, need to change it  
*/  

USE chess;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,    /* Use the password datatype instead please */
	PRIMARY KEY (id)
);
