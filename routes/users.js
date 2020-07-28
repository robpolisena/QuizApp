/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const dbParams = require("../lib/db");
const router = express.Router();

module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // // in api routes
  // router.get('/quizzes', (req, res) => {
  //   console.log('get /quizzes happening')
  //   //const getAllQuizzes = function () {
  //     const query = (`SELECT quizzes.name
  //     FROM quizzes;`)
  //     console.log(query)
  //     return pool.query(query)
  //       .then(res => res.rows);

  //     db.getAllQuizzes(req.query)
  //       .then(quizzes =>  {
  //         res.send({ quizzes })
  //         // res.render("urls_list_of_quizzes", quizzes);
  //       })
  //       .catch(e => {
  //         console.error(e);
  //         res.send(e)
  //       }
  router.get("/", async (req, res) => {
    let quizzesQuery = `SELECT quizzes.name as quiz, users.name as user
    FROM quizzes
    JOIN users ON owner_id = users.id;`;
    let categoriesQuery = `SELECT * FROM categories`;

    const quizzesData = await db.query(quizzesQuery);
    const categoriesData = await db.query(categoriesQuery);

    const userLogin = quizzesData.rows[0].user;
    const quizzes = quizzesData.rows;
    const categories = categoriesData.rows;

    //console.log(userLogin);
    res.render("index", { quizzes, userLogin, categories });

    // db.query(query)
    // .then(data => {
    //   //const templateVars = { urls: userURLs, user: users[req.session['user_id']]};
    //   //const userLogin = data.rows[]; <%= userLogin %>
    //   // console.log(userLogin);
    //   const userLogin = data.rows[0].user;
    //   const quizzes = data.rows;
    //   console.log(quizzes, 'data with users and names');
    //   res.render("index", { quizzes, userLogin });
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // })
  });

  // router.get("/quizzes/new", (req, res) => {
  //   let query = `SELECT quizzes.name as quiz, users.name as user
  //                   FROM quizzes
  //                   JOIN users ON owner_id = users.id;`;
  //   db.query(query).then((data) => {
  //     const userLogin = data.rows[0].user;
  //     res.render("create_quiz_form", { userLogin });
  //     //console.log(req.body)
  //   });
  // });

  // router.post("/quizzes/new", (req, res) => {
  //   //  return pool.query(queryRequest, [user.name, user.email, user.password])
  //   //   .then(res => res.rows[0]);
  //   //res.render("create_quiz_form");
  //   //console.log(req.body)
  //   const {
  //     quiz_name,
  //     quiz_category,
  //     question1,
  //     question1_option1,
  //     question1_option2,
  //     question1_option3,
  //     question1_answer,
  //     question2,
  //     question2_option1,
  //     question2_option2,
  //     question2_option3,
  //     question2_answer,
  //     question3,
  //     question3_option1,
  //     question3_option2,
  //     question3_option3,
  //     question3_answer,
  //     question4,
  //     question4_option1,
  //     question4_option2,
  //     question4_option3,
  //     question4_answer,
  //     question5,
  //     question5_option1,
  //     question5_option2,
  //     question5_option3,
  //     question5_answer,
  //   } = req.body;

  //   const quizValues = [1, quiz_name, 1, true, true, 10];

  //   const questionValues = [
  //     question1,
  //     question2,
  //     question3,
  //     question4,
  //     question5,
  //   ];

  //   const optionValues = [
  //     question1_option1,
  //     question1_option2,
  //     question1_option3,
  //     question1_answer,
  //     question2_option1,
  //     question2_option2,
  //     question2_option3,
  //     question2_answer,
  //     question3_option1,
  //     question3_option2,
  //     question3_option3,
  //     question3_answer,
  //     question4_option1,
  //     question4_option2,
  //     question4_option3,
  //     question4_answer,
  //     question5_option1,
  //     question5_option2,
  //     question5_option3,
  //     question5_answer,
  //   ];

  //   //   function (req, res) {
  //   //     db.tx(async t => { // automatic BEGIN
  //   //             let data = await t.one('INSERT_1 VALUES(...) RETURNING id', paramValues);
  //   //             let q = await t.none('INSERT_2 VALUES(...)', data.id);
  //   //             if (req.body.value != null) {
  //   //                 return await t.none('INSERT_3 VALUES(...)', data.id);
  //   //             }
  //   //             return q;
  //   //         })
  //   //         .then(data => {
  //   //             res.send("Everything's fine!"); // automatic COMMIT was executed
  //   //         })
  //   //         .catch(error => {
  //   //             res.send("Something is wrong!"); // automatic ROLLBACK was executed
  //   //         });
  //   // }

  //   db.query(async (t) => {
  //     const quizzesRequest = await t.one(
  //       `INSERT INTO quizzes (owner_id, name, category_id, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, now()::date, $6) RETURNING id AS quiz_id;`
  //     );
  //     const questionRequest = await t.one(
  //       `INSERT INTO questions (question) VALUES ($1) RETURNING id AS question_id;`,
  //       quizzesRequest.id
  //     );
  //     const optionRequest = await t.one(
  //       `INSERT INTO options (option) VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15), ($16), ($17), ($18), ($19), ($20) RETURNING id AS option_id;`,
  //       questionRequest.id
  //     );
  //     return optionRequest;
  //   }).then((quizData) => {
  //     console.log(quizData.rows, "quiz_id");
  //     //res.send("Everything's fine!"); // automatic COMMIT was executed
  //   });
  //   // db.query(quizzesRequest, quizValues)
  //   //       .then(quizData => {
  //   //console.log(data.rows, 'data rows 1')
  //   //console.log(quizData.rows[0].quiz_id, 'quiz_id')

  //})

  //           console.log(questionValues[0]);

  // db.query(questionRequest, questionValues[0])
  //     .then(questionData => {
  //   console.log(questionData, 'questionData')
  //     })

  // console.log("done with query");

  // const optionRequest = `INSERT INTO options (option) VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15), ($16), ($17), ($18), ($19), ($20) RETURNING id AS option_id;`

  // db.query(optionRequest, optionValues)
  // .then(optionData => {
  //   // console.log(data.rows, 'data rows 3')
  // })

  //const quizQuestionRequestValue = [data.rows[0].quiz_id]
  // const quizQuestionRequest = `INSERT INTO quiz_question (quiz_id, question_id) VALUES () RETURNING id AS quizQuestion_id;`
  // const quizzesData = await db.query(quizzesRequest, quizValues);
  // const questionData = await db.query(questionRequest, questionValues[0]);
  // const optionData = await db.query(optionRequest, optionValues);

  // const quizzes = quizzesData.rows;
  // const categories = categoriesData.rows;

  // console.log(userLogin);
  // res.render("index", { quizzes, userLogin, categories });

  // INSERT INTO quiz_question (quiz_id, question_id) VALUES ();
  // INSERT INTO question_answer (question_id, answer_id) VALUES ();
  // INSERT INTO question_option (question_id, option_id) VALUES ();
  // INSERT INTO question_option (question_id, option_id) VALUES ();
  // INSERT INTO question_option (question_id, option_id) VALUES ();

  //console.log(quiz_category)
  //function to insert question to the database
  // Remember to include the user_id

  // })
  // }

  //route to a specific QUIZ
  //   router.get("/quizzes/id", (req, res) => {
  //   let query = `SELECT DISTINCT questions.question
  //   FROM quizzes
  //   JOIN quiz_question ON quiz_id = quizzes.id
  //   JOIN questions ON questions.id = question_id
  //   JOIN question_answer ON question_answer.question_id = questions.id
  //   JOIN options ON options.id = answer_id
  //   JOIN question_option ON question_option.question_id = question_answer.id
  //   WHERE quizzes.id = 3
  // `;

  // db.query(query)
  // .then(data => {
  // //const templateVars = { urls: userURLs, user: users[req.session['user_id']]};
  // //const userLogin = data.rows[]; <%= userLogin %>
  // // console.log(userLogin);
  //   const question = data.rows[0];
  //   console.log(question, 'question')
  // //console.log(quizzes, 'data with users and names');
  // res.render("question_container");

  // })

  //         //console.log(req.body)
  //   })

  // res.render("create_quiz_form")
  //console.log(req.body)

  //route to a specific QUIZ
  return router;
};
