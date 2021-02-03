-- DROP DATABASE instalone_db;
-- CREATE DATABASE instalone_db;
-- USE instalone_db;
-- CREATE TABLE `user` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `user_firstname` VARCHAR(255) NOT NULL,
--   `user_lastname` VARCHAR(255) NOT NULL,
--   `user_picture` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`id`)
-- );
-- CREATE TABLE `post` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `post_message` VARCHAR(255) NOT NULL,
--   `post_picture` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`id`)
-- );
-- CREATE TABLE `comment` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `post_id` INT NOT NULL,
--   `comment_message` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`id`),
--   FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE
-- );
-- Alternative a ON DELETE CASCADE qui ne supprime pas une track mais lui donne une valeur null
-- ON DELETE SET NULL
INSERT INTO
  user
VALUES
  ('Nathan', 'Vanstaevel', 'profil-picture')