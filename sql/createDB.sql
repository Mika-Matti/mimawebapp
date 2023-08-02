CREATE DATABASE IF NOT EXISTS mima_test_db;

USE mima_test_db;

CREATE TABLE IF NOT EXISTS projects (
  project_id INT(11) NOT NULL AUTO_INCREMENT,
  project_title VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  project_content TEXT NOT NULL,
  project_link VARCHAR(255),
  project_start_date DATE,
  PRIMARY KEY (project_id)
);

CREATE TABLE IF NOT EXISTS users (
	user_id INT(11) NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(255) NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	user_email VARCHAR(255),
	user_role ENUM('admin', 'moderator', 'user', 'guest'),
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS posts (
  post_id INT(11) NOT NULL AUTO_INCREMENT,
  post_title VARCHAR(255) NOT NULL,
  post_content TEXT NOT NULL,
  post_date DATETIME,
  post_is_public BOOLEAN,
  user_id INT(11),
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);