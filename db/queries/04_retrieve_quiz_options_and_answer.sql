SELECT DISTINCT quizzes.name AS name, questions.question AS question, options.option AS Answer
FROM quizzes
  JOIN quiz_question ON quiz_id = quizzes.id
  JOIN questions ON questions.id = question_id
  JOIN question_answer ON question_answer.question_id = questions.id
  JOIN options ON options.id = answer_id
  JOIN question_option ON question_option.question_id = question_answer.id
  ORDER BY name;

