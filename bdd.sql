DROP DATABASE playlist_db;
CREATE DATABASE playlist_db;
USE playlist_db;
CREATE TABLE `album` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `album_title` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(255) NOT NULL,
  `picture` VARCHAR(255) NOT NULL,
  `artist` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `track` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL,
  `youtube_url` VARCHAR(255) NOT NULL,
  `album_id` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`album_id`) REFERENCES `album`(`id`) ON DELETE CASCADE
);
-- Alternative a ON DELETE CASCADE qui ne supprime pas une track mais lui donne une valeur null
-- ON DELETE SET NULL