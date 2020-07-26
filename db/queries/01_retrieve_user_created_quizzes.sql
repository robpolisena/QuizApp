SELECT users.name AS users, quizzes.name AS quiz_name
FROM quizzes
  JOIN users ON owner_id = users.id;
