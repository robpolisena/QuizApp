SELECT  * FROM (SELECT quizzes.name AS name, quizzes.id AS quiz_id, questions.question AS question, options.option AS Options, FALSE as answer
FROM quizzes
JOIN quiz_question ON quiz_id = quizzes.id
JOIN questions ON questions.id = quiz_question.question_id
JOIN question_option ON question_option.question_id = questions.id
JOIN options ON options.id = question_option.option_id
UNION
SELECT quizzes.name AS name, quizzes.id AS quiz_id, questions.question AS question, options.option AS Options, TRUE as answer
FROM quizzes
JOIN quiz_question ON quiz_id = quizzes.id
JOIN questions ON questions.id = quiz_question.question_id
JOIN question_answer ON question_answer.question_id = questions.id
JOIN options ON options.id = question_answer.answer_id) AS foo
WHERE foo.quiz_id = 1
ORDER BY foo.question, foo.answer;
-- SELECT quizzes.name AS quiz_name, questions.question AS questions
  --JOIN question_answer ON question_answer.answer_id = options.id
-- FROM questions
-- JOIN quiz_question ON question_
-- -- JOIN quiz_question ON quiz_id = quizzes.id
-- -- --
