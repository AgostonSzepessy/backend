-- ****IMPORTANT********************************************************
-- *********************************************************************
-- * Must create a user called 'movnetuser' before running this script *
-- *********************************************************************
-- *********************************************************************
CREATE DATABASE movnet;

USE movnet;

CREATE TABLE User(
    fname VARCHAR(32)NOT NULL,
    lname VARCHAR(32) NOT NULL,
    username VARCHAR(20) PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password CHAR(128) NOT NULL
);

CREATE TABLE Movie(
    movie_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(512),
    runtime INT,
    genre VARCHAR(32),
    parental_rating CHAR(5),
    poster_url CHAR(255),
    synopsis TEXT,
    movie_length TINYTEXT
);

CREATE TABLE Theater(
    theater_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256),
    address VARCHAR(1024),
    longitude FLOAT,
    latitude FLOAT
);

CREATE TABLE Showtime(
    showtime_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    theater_id BIGINT NOT NULL,
    date_time DATETIME,
    movie_id BIGINT NOT NULL,
    cost FLOAT,

    CONSTRAINT fk_showtime_theater_id
        FOREIGN KEY (theater_id) REFERENCES Theater(theater_id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT fk_showtime_movie_id
        FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE Friend(
    friend_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    u1_id VARCHAR(20) NOT NULL,
    u2_id VARCHAR(20) NOT NULL,
    u2_confirmed BOOL DEFAULT FALSE,

    CONSTRAINT fk_friend_u1_id
        FOREIGN KEY (u1_id) REFERENCES User(username)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT fk_friend_u2_id
        FOREIGN KEY (u2_id) REFERENCES User(username)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE Event(
    event_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(512),
    showtime_id BIGINT,

    CONSTRAINT fk_event_showtime_id
        FOREIGN KEY (showtime_id) REFERENCES Showtime(showtime_id)
        ON DELETE SET NULL -- If the showtime is deleted, the event should not be deleted
        ON UPDATE RESTRICT
);

CREATE TABLE Participation(
    participation_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL,
    username VARCHAR(20) NOT NULL,

    CONSTRAINT fk_participation_event_id
        FOREIGN KEY (event_id) REFERENCES Event(event_id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT fk_participation_username
        FOREIGN KEY (username) REFERENCES User(username)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE Chat(
    chat_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128),
    event_id BIGINT NOT NULL,

    CONSTRAINT fk_chat_event_id
        FOREIGN KEY (event_id) REFERENCES Event(event_id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE Message(
    message_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    chat_id BIGINT NOT NULL,
    username VARCHAR(20) NOT NULL,
    message_text TEXT,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- can't call functions on default values, so need to use CURRENT_TIMESTAMP instead

    CONSTRAINT fk_message_chat_id
        FOREIGN KEY (chat_id) REFERENCES Chat(chat_id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT fk_message_username
        FOREIGN KEY (username) REFERENCES User(username)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

-- Links Chats and Users together because a User can be in many Chats
-- and a Chat can have many Users
CREATE TABLE ChatParticipation(
    chat_participation_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    chat_id BIGINT NOT NULL,
    username VARCHAR(20) NOT NULL,

    CONSTRAINT fk_chatparticipation_chat_id
        FOREIGN KEY (chat_id) REFERENCES Chat(chat_id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT fk_chatparticipation_username
        FOREIGN KEY (username) REFERENCES User(username)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

-- Grant some privileges to movnetuser
GRANT SELECT, INSERT, UPDATE, DELETE ON movnet.* TO 'movnetuser';

