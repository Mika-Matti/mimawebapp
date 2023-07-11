#Check if the database exists
SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'mima_test_db';

CREATE DATABASE IF NOT EXISTS mima_test_db;

USE mima_test_db;

#Check if the table exists
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mima_test_db' AND TABLE_NAME = 'projects';

CREATE TABLE IF NOT EXISTS projects (
  project_id INT(11) NOT NULL AUTO_INCREMENT,
  project_title VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  project_content TEXT NOT NULL,
  project_link VARCHAR(255),
  project_start_date DATE,
  PRIMARY KEY (project_id)
);

#Check if the table exists
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mima_test_db' AND TABLE_NAME = 'users';

CREATE TABLE IF NOT EXISTS users (
	user_id INT(11) NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	user_email VARCHAR(255),
	user_role ENUM('admin', 'moderator', 'user', 'guest'),
	PRIMARY KEY (user_id)
);