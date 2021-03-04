DROP TABLE IF EXISTS sounds;


 CREATE TABLE sounds(
      id SERIAL PRIMARY KEY,
      sound_url VARCHAR DEFAULT NULL,
      rec_name VARCHAR NOT NULL,
      category VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );