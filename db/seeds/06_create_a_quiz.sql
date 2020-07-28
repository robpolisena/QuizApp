-- retrieve all questions based on a certain category
SELECT DISTINCT quizzes.name AS name, questions.question AS question, options.option AS Answer
FROM quizzes
  JOIN quiz_question ON quiz_id = quizzes.id
  JOIN categories ON quizzes.category_id = categories.id
  JOIN questions ON questions.id = question_id
  JOIN question_answer ON question_answer.question_id = questions.id
  JOIN options ON options.id = answer_id
  JOIN question_option ON question_option.question_id = question_answer.id
  WHERE categories.name LIKE '%nimal%'
  ORDER BY name;

-- Creating quizzes
INSERT INTO quizzes (owner_id, category_id, name, isPublic, isReady, date_created, points_allocated) VALUES (1, 4, 2, 'Animals quiz', false, false, Now()::, 10);
INSERT INTO questions (question) VALUES ($);
INSERT INTO options (option) VALUES ('Simien Jackel');
INSERT INTO options (option) VALUES ('Ethiopian Coyote');
INSERT INTO options (option) VALUES ('Amharic Fox');
INSERT INTO options (option) VALUES ('Canis Simiensis');
INSERT INTO quiz_question (id, quiz_id, question_id) VALUES (1, 1, 1);
INSERT INTO question_answer (id, question_id, answer_id) VALUES (1, 1, 1);
INSERT INTO question_option (id, question_id, option_id) VALUES (1, 1, 2);
INSERT INTO question_option (id, question_id, option_id) VALUES (2, 1, 3);
INSERT INTO question_option (id, question_id, option_id) VALUES (3, 1, 4);

const values = [
  1,
  quizName,
  quiz_category,
  true,
  true,
  now()::date,
  10,
  question1,
  question1_option1,
  question1_option2,
  question1_option3,
  question1_answer,
  question2,
  question2_option1,
  question2_option2,
  question2_option3,
  question2_answer,
  question3,
  question3_option1,
  question3_option2,
  question3_option3,
  question3_answer,
  question4,
  question4_option1,
  question4_option2,
  question4_option3,
  question4_answer,
  question5,
  question5_option1,
  question5_option2,
  question5_option3,
  question5_answer  ]

INSERT INTO quizzes (owner_id, name, category, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
INSERT INTO questions (question) VALUES ($8), ($13), ($18), ($23), ($28) RETURNING id;
INSERT INTO options (option) VALUES ($9);
INSERT INTO options (option) VALUES ($10);
INSERT INTO options (option) VALUES ($11);
INSERT INTO options (option) VALUES ($12) RETURNING id;

INSERT INTO quizzes (owner_id, category, name, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
INSERT INTO questions (question) VALUES ($8), ($13), ($18), ($23), ($28) RETURNING id;
INSERT INTO options (option) VALUES ($9);
INSERT INTO options (option) VALUES ($10);
INSERT INTO options (option) VALUES ($11);
INSERT INTO options (option) VALUES ($12) RETURNING id;

INSERT INTO quizzes (owner_id, category, name, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
INSERT INTO questions (question) VALUES ($8), ($13), ($18), ($23), ($28) RETURNING id;
INSERT INTO options (option) VALUES ($9);
INSERT INTO options (option) VALUES ($10);
INSERT INTO options (option) VALUES ($11);
INSERT INTO options (option) VALUES ($12) RETURNING id;

INSERT INTO quizzes (owner_id, category, name, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
INSERT INTO questions (question) VALUES ($8), ($13), ($18), ($23), ($28) RETURNING id;
INSERT INTO options (option) VALUES ($9);
INSERT INTO options (option) VALUES ($10);
INSERT INTO options (option) VALUES ($11);
INSERT INTO options (option) VALUES ($12) RETURNING id;

INSERT INTO quizzes (owner_id, category, name, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
INSERT INTO questions (question) VALUES ($8), ($13), ($18), ($23), ($28) RETURNING id;
INSERT INTO options (option) VALUES ($9);
INSERT INTO options (option) VALUES ($10);
INSERT INTO options (option) VALUES ($11);
INSERT INTO options (option) VALUES ($12) RETURNING id;



INSERT INTO quiz_question (quiz_id, question_id) VALUES ();
INSERT INTO question_answer (question_id, answer_id) VALUES (${res.row[2].answer}, ${res.row[2].answer});
INSERT INTO question_option (question_id, option_id) VALUES ();
INSERT INTO question_option (question_id, option_id) VALUES ();
INSERT INTO question_option (question_id, option_id) VALUES ();
