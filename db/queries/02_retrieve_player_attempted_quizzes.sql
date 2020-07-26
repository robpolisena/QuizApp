SELECT users.name AS users, quizzes.name AS quiz_name
FROM completed_quizzes
  JOIN users ON player_id = users.id
  JOIN quizzes ON quiz_id = quizzes.id;
