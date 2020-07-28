DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS options CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS completed_quizzes CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS question_answer CASCADE;
DROP TABLE IF EXISTS question_option CASCADE;
DROP TABLE IF EXISTS quiz_question CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  level SMALLINT,
  total_points SMALLINT
);

CREATE TABLE options
(
  id SERIAL PRIMARY KEY NOT NULL,
  option TEXT
);

CREATE TABLE categories
  (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT
  );

CREATE TABLE questions
    (
      id SERIAL PRIMARY KEY NOT NULL,
      question TEXT
    );

CREATE TABLE quizzes
  (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT,
  isPublic BOOLEAN,
  isReady BOOLEAN,
  -- difficulty VARCHAR(55) NOT NULL CHECK (difficulty LIKE 'Easy' OR 'Medium' OR 'Hard'),
  date_created  DATE NOT NULL,
  points_allocated SMALLINT
);


CREATE TABLE completed_quizzes
    (
      id SERIAL PRIMARY KEY NOT NULL,
      quiz_id SMALLINT REFERENCES quizzes(id) ON DELETE CASCADE,
      player_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      score SMALLINT NOT NULL,
      completed_date DATE NOT NUll,
      points_gotten SMALLINT NOT NULL
    );


CREATE TABLE question_answer
    (
      id SERIAL PRIMARY KEY NOT NULL,
      question_id SMALLINT REFERENCES questions(id) ON DELETE CASCADE,
      answer_id SMALLINT REFERENCES options(id) ON DELETE CASCADE
    );

CREATE TABLE question_option
    (
      id SERIAL PRIMARY KEY NOT NULL,
      question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
      option_id INTEGER REFERENCES options(id) ON DELETE CASCADE
    );

CREATE TABLE quiz_question
    (
      id SERIAL PRIMARY KEY NOT NULL,
      quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
      question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE
    );



