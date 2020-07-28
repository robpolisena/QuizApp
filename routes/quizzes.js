const express = require("express");
const dbParams = require("../lib/db");
const router = express.Router();

module.exports = (db) => {
  router.get("/new", (req, res) => {
    let query = `SELECT quizzes.name as quiz, users.name as user, users.id as userId
                    FROM quizzes
                    JOIN users ON owner_id = users.id;`;
    db.query(query).then((data) => {
      const userId = data.rows[0].userid;
      const userLogin = data.rows[0].user;
      res.render("create_quiz_form", { userLogin, userId });
      //console.log(req.body)
    });
  });

  // the route should be /quizzes

  router.post("/", (req, res) => {
    //  return pool.query(queryRequest, [user.name, user.email, user.password])
    //   .then(res => res.rows[0]);
    //res.render("create_quiz_form");
    //console.log(req.body)

    const {
      quiz_name,
      quiz_category,
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
      question5_answer,
    } = req.body;

    // console.log(req.body)
    // [userId, quizNane, categoryId, public/private, completed, score]
    const quizValues = [1, quiz_name, 1, true, true, 10];

    // questions
    const questionValues = [
      question1,
      question2,
      question3,
      question4,
      question5,
    ];

    // answers
    const optionValues = [
      question1_option1,
      question1_option2,
      question1_option3,
      question1_answer,
      question2_option1,
      question2_option2,
      question2_option3,
      question2_answer,
      question3_option1,
      question3_option2,
      question3_option3,
      question3_answer,
      question4_option1,
      question4_option2,
      question4_option3,
      question4_answer,
      question5_option1,
      question5_option2,
      question5_option3,
      question5_answer,
    ];

    const insertQuiz = function (quizValues) {
      const quizQuerry = `INSERT INTO quizzes (owner_id, name, category_id, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, now()::date, $6) RETURNING id AS quiz_id;`;
      //return pool
      return db
        .query(quizQuerry, quizValues)
        .then((quizRes) => {
          console.log("Quiz ID Created", quizRes.rows, quizRes.rows[0].quiz_id);
          return quizRes.rows[0];
        })
        .catch((err) => console.error("query error", err.stack));
    };

    const insertQuestions = function (questionValues) {
      console.log(`question values: ${questionValues}`);
      const questionQuerry = `INSERT INTO questions (question) VALUES ($1), ($2), ($3), ($4), ($5) RETURNING id as question_id;`;
      return db
        .query(questionQuerry, questionValues)
        .then((questionRes) => {
          // console.log(`question1 id: ${JSON.stringify(questionRes.rows[0].question_id)}`)
          // console.log(`question2 id: ${JSON.stringify(questionRes.rows[1].question_id)}`)
          // console.log(`question3 id: ${JSON.stringify(questionRes.rows[2].question_id)}`)
          // console.log(`question4 id: ${JSON.stringify(questionRes.rows[3].question_id)}`)
          // console.log(`question5 id: ${JSON.stringify(questionRes.rows[4].question_id)}`)
          return res.rows;
        })
        .catch((err) => console.error("query error", err.stack));
    };

    // INSERT INTO quiz_question (quiz_id, question_id) VALUES ();
    // INSERT INTO question_answer (question_id, answer_id) VALUES ();
    // INSERT INTO question_option (question_id, option_id) VALUES ();
    // INSERT INTO question_option (question_id, option_id) VALUES ();
    // INSERT INTO question_option (question_id, option_id) VALUES ();
    // const quizQuestionValue = [
    //   quizRes.rows[0].quiz_id,
    //   questionRes.rows[0].question_id,
    // ];

    const insertQuizQuestion = function (quizQuestionValue) {
      const quizQuestionQuerry = `INSERT INTO quiz_question (quiz_id, question_id) VALUES ($1, $2) RETURNING id AS quizQuestion_id;`;
      return db
        .query(quizQuestionQuerry, quizQuestionValue)
        .then((quizQuestionRes) => {
          console.log("quizQuestionRes", quizQuestionRes.rows[0]);
          return quizQuestionRes.rows;
        })
        .catch((err) => console.error("query error", err.stack));
    };


    //This is where the promises starts
    insertQuiz(quizValues)
      .then(({ quiz_id }) => {
        console.log(`QuizId ${quiz_id}`);
        insertQuestions(questionValues);
        return quiz_id;
      })
      .then((quiz_id) => {
        console.log(`Insert Questions Response: ${quiz_id}`);

        insertQuizQuestion(quizQuestionValue).then((quizQuestionResponse) => {
          console.log("quizQuestionResponse", quizQuestionResponse);

          return {
            quiz_id,
            quizQuestionResponse,
          };
        });
      })
      .catch((e) => {
        console.log(`err catch:${e}`);
        res.send(e);
      });
  });

  return router;
};
