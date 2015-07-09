CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  u_id int,
  text varchar(180),
  r_id int,
  time date
  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  r_id int NOT NULL AUTO_INCREMENT,
  name varchar(20),
  PRIMARY KEY (r_id)
);

CREATE TABLE users (
  u_id int NOT NULL AUTO_INCREMENT,
  name varchar(20),
  PRIMARY KEY (u_id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

