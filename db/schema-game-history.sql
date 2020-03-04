/* 
  Creates the game history table TODO: This came from cats, need to change it  
*/  

USE chess;

CREATE TABLE gamehistory
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	sleepy BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
