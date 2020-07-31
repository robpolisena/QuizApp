const express = require("express");
const dbParams = require("../lib/db");
const router = express.Router();
const app = express();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');
const { request } = require("express");
const saltRounds = 10;

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


//app.use(cookieParser());
app.set("view engine", "ejs");

module.exports = (db) => {
 //retrieve username
 const userName = async (userid) => {
  let query = `SELECT users.name as userName
      FROM users
      WHERE users.id = ${userid}`;
     return await db.query(query)
  .then((data) => {
     return data.rows[0].username;
  })
  .catch((err) => {
  console.log(err, 'first userName error');
  })
  }

  router.get("/new", (req, res) => {
    const userId = req.session['user_id'];

    // sanity check to make sure userId has a value

    userName(userId)
    .then(person => {
    let query = `SELECT quizzes.name as quiz, quizzes.id AS quizId, users.name as user, users.id as userId
                    FROM quizzes
                    JOIN users ON owner_id = users.id;`;
      db.query(query).then((data) => {
        const myQuizzes = data.rows;
      res.render("create_quiz_form", { person, userId, myQuizzes} );
    }).catch((err) => {
      res.status(500).json({ error: err.message });
     });
   });
});

  router.post("/new", (req, res) => {
    // const quiz_category = [1, 2, 3, 4, 5];
    // const [ Sports, Animals, Vehicle, Celebrities, Entertaiment ] = quiz_category;
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



    // [userId, quizNane, categoryId, public/private, completed, score]
    const idForUser = req.session['user_id'];
    const cat_id = req.body.quiz_category

    const getCategoryId = function (cat_id){
      //let categoryId;
      if (cat_id === 'Sports') {
        return 1
      } else if (cat_id === 'Animals') {
        return 2
      } else if (cat_id === 'Vehicles') {
        return 3
      } else if (cat_id === 'Celebrities') {
        return 4
      } else if(cat_id === 'Entertainment') {
        return 5
      }
    }


    console.log(getCategoryId(cat_id), 'categoryId from getCategoryId function')
  // quiz
    const quizValues = [idForUser, quiz_name, getCategoryId(cat_id), true, true, 10];


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
          return questionRes.rows;
        })
        .catch((err) => console.error("query error", err.stack));
    };

    const insertQuizQuestion = function (quizId, questionId) {
      const quizQuestionQuerry = `INSERT INTO quiz_question (quiz_id, question_id) VALUES ($1, $2) RETURNING id AS quizQuestion_id;`;
      return db
        .query(quizQuestionQuerry, [quizId, questionId])
        .then((quizQuestionRes) => {
          // console.log("quizQuestionRes", quizQuestionRes.rows[0]);
          return quizQuestionRes.rows;
        })
        .catch((err) => console.error("query error", err.stack));
    };

    const insertAllQuizQuestions = function (quiz_id, questionsIds) {
      for (let questionIdObj of questionsIds) {
        insertQuizQuestion(quiz_id, questionIdObj.question_id);
      }
    };

    const createQuestionOptions = function (questionsIds, optionsIds) {
      const questionOptions = {};

      const questionMap = {
        1: {
          1: question1_option1,
          2: question1_option2,
          3: question1_option3,
          4: question1_answer,
        },
        2: {
          5: question2_option1,
          6: question2_option2,
          7: question2_option3,
          8: question2_answer,
        },
        3: {
          9: question3_option1,
          10: question3_option2,
          11: question3_option3,
          12: question3_answer,
        },
        4: {
          13: question4_option1,
          14: question4_option2,
          15: question4_option3,
          16: question4_answer,
        },
        5: {
          17: question5_option1,
          18: question5_option2,
          19: question5_option3,
          20: question5_answer,
        },
      };

      let currentQuestion = 1;
      for (let questionIdObj of questionsIds) {
        let optionsIndex = currentQuestion * 4 - 3;
        let answerIndex = currentQuestion * 4 - 1;
        let optionsList = [];

        for (let i = optionsIndex; i < optionsIndex + 3; i++) {
          const option = {
            optionId: optionsIds[i - 1].option_id,
            option: questionMap[currentQuestion][i],
          };

          optionsList.push(option);
        }

        questionOptions[questionIdObj.question_id] = {
          questionId: questionIdObj.question_id,
          options: optionsList,
          answer: {
            answerId: optionsIds[answerIndex].option_id,
            answer: questionMap[currentQuestion][answerIndex],
          },
        };
        currentQuestion += 1;
      }

      return questionOptions;
    };

    const insertOptions = function (optionValues) {
      const query = `INSERT INTO options (option) VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15), ($16), ($17), ($18), ($19), ($20) RETURNING id AS option_id`;

      return db
        .query(query, optionValues)
        .then((result) => {
          return result.rows;
        })
        .catch((e) => console.log(e));
    };

    const inserQuestionAnswer = function (questionId, answerId) {
      const query = `INSERT INTO question_answer (question_id, answer_id) VALUES ($1, $2)`;

      db.query(query, [questionId, answerId])
        .then((result) => result.rows)
        .catch((err) => console.log(err.message));
    };

    const insertAllQuestionAnswers = function (questionOptions) {
      for (let questionObj of questionOptions) {
        inserQuestionAnswer(
          questionObj.questionId,
          questionObj.answer.answerId
        );
      }
    };

    const insertQuestionOption = function (questionId, optionId) {
      const query = `INSERT INTO question_option (question_id, option_id) VALUES($1, $2)`;

      db.query(query, [questionId, optionId])
        .then((result) => result.rows)
        .catch((err) => console.log(err.message));
    };

    const insertAllQuestionOptions = function (questionOptions) {
      for (let questionObj of questionOptions) {
        for (let optionObj of questionObj.options) {
          insertQuestionOption(questionObj.questionId, optionObj.optionId);
        }
      }
    };

    Promise.all([
      insertQuiz(quizValues),
      insertQuestions(questionValues),
      insertOptions(optionValues),
    ])
      .then(([{ quiz_id }, questionsIds, optionsIds]) => {
        // Inserting all the questions in the quiz_question table
        insertAllQuizQuestions(quiz_id, questionsIds);

        // Creating a data structure associating the questions ids to their options and answer
        // The result is an array of objects
        const questionOptions = Object.values(
          createQuestionOptions(questionsIds, optionsIds)
        );

        // console.log(JSON.stringify(questionOptions));

        // Inserting answers in the question_answer table
        insertAllQuestionAnswers(questionOptions);

        // Inserting the options in the question_option table
        insertAllQuestionOptions(questionOptions);
      })
      .catch((e) => console.log(e));
    res.redirect("/");
  });

  router.post("/result", (req, res) => {
    console.log("THIS IS WHERE YOU ARE", req.body);
    const userId = req.session['user_id'];
    console.log('userid in the results section', userId);
    userName(userId)
    .then(person => {
    //get the user_id
    const quizId = req.body.quiz_id;
    // const userId = req.session['user_id'];
    const score = req.body.score;
    const queryValues = [quizId, userId, score]
    console.log(queryValues, 'these are the query values');
    const query = `INSERT INTO completed_quizzes (quiz_id, player_id, score, completed_date, points_gotten) VALUES ($1, $2, $3, now()::date, 0) RETURNING id;`;
    db.query(query, queryValues)
      .then((data) => {
        res.redirect(`/quizzes/result/${data.rows[0].id}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  });

  router.get('/result/:id', (req, res) => {
    const userId = req.session['user_id'];
    const queryValues = [req.params.id];
    const query = `SELECT * FROM completed_quizzes WHERE id = $1`;
    db.query(query, queryValues)
      .then((data) => {
        userName(userId)
    .then(person => {
      res.render("results-box", { score: data.rows[0].score, userId, person });
    })
      })

    // Pull out the query for the completed quiz (score and person)
    // then res.render the result box showing the score and person

  })

  router.post("/private", (req, res) => {
    console.log('req.body===>', req.body)
    const quiz_id = req.body.quiz_id;
    const queryValues = [false, quiz_id]
    const query = `UPDATE quizzes SET isPublic = $1 WHERE quizzes.id = $2`;
    db.query(query, queryValues)
      .then((data) => {
        res.status(204).send()
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });

  router.post("/public", (req, res) => {
    console.log('req.body===>', req.body)
    const quiz_id = req.body.quiz_id;
    const queryValues = [true, quiz_id]
    const query = `UPDATE quizzes SET isPublic = $1 WHERE quizzes.id = $2`;
    db.query(query, queryValues)
      .then((data) => {
        res.status(204).send()
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });


  return router;
};


