/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const dbParams = require("../lib/db");
const router = express.Router();
//const pgp = require('pg-promise')();

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
  // router.get('/quizzes', (req, res) => {git
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

  // Root api/users
  router.get("/", (req, res) => {
    let query = `SELECT quizzes.name as quiz, users.name as user, users.id as userId, categories.name as category
                    FROM quizzes
                    JOIN users ON owner_id = users.id
                    JOIN categories ON category_id = categories.id`;
    db.query(query)
      .then((data) => {
        //const templateVars = { urls: userURLs, user: users[req.session['user_id']]};
        //const userLogin = data.rows[]; <%= userLogin %>
        const userId = data.rows[0].userid;
        const userLogin = data.rows[0].user;
        //console.log(userLogin);
        const quizzes = data.rows;
        //console.log(quizzes, 'data with users and names');
        res.render("index", { quizzes, userLogin, userId });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Most Recent
  router.get("/myQuizzes/:id", (req, res) => {
    const userId = req.params.id;

    let query = `SELECT quizzes.name as quiz, date_created as Created, users.name as Creator
                FROM quizzes
                JOIN users ON owner_id = users.id
                WHERE quizzes.owner_id = ${userId}
                ORDER BY created DESC`;
    db.query(query)
      .then((data) => {
        // const userLogin = data.rows[0].user;
        const userLogin = data.rows[0].creator;
        const myQuizzes = data.rows;
        res.render("my_quizzes", { myQuizzes, userLogin, userId });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });



  // Most Recent
  router.get("/quizzes/recent", (req, res) => {
    let query = `SELECT quizzes.name as quiz, date_created as Created
                  FROM quizzes
                  ORDER BY created DESC`;
    db.query(query)
      .then((data) => {
        //const userLogin = data.rows[]; <%= userLogin %>
        console.log(data.rows, "data for recent quiz");
        // const userLogin = data.rows[0].user;
        console.log(data.rows);
        const recentQuizzes = data.rows;
        const userLogin = "Carlita Bellenger";

        res.render("recent", { recentQuizzes, userLogin });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // POPULAR

  router.get("/quizzes/popular", (req, res) => {
    let query = `SELECT quizzes.name as quiz, count(completed_quizzes.*) as attempts, quizzes.owner_id as userId
                  FROM quizzes
                  JOIN completed_quizzes ON quizzes.id = completed_quizzes.quiz_id
                  GROUP BY quizzes.name, quizzes.owner_id
                  ORDER BY attempts DESC`;
    db.query(query)
      .then((data) => {
        //const templateVars = { urls: userURLs, user: users[req.session['user_id']]};
        //const userLogin = data.rows[]; <%= userLogin %>
        //console.log(data.rows[0]);
        const userId = data.rows[0].userid;
        // const userLogin = data.rows[0].user;
        const popularQuizzes = data.rows;
        const userLogin = "Carlita Bellenger";

        res.render("popular", { popularQuizzes, userLogin, userId });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // ANIMALS CATEGORY id 2

  router.get("/quizzes/animals", (req, res) => {
    let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
      FROM quizzes
      JOIN users ON owner_id = users.id
      JOIN categories ON category_id = categories.id
      WHERE category_id = 2 AND isPublic=true`;
    db.query(query)
      .then((data) => {
        console.log(data.rows, "data for animals category");
        const animalsCategory = data.rows;
        const userLogin = "Carlita Bellenger";
        res.render("animals", { animalsCategory, userLogin });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // SPORTS CATEGORY id 1

  router.get("/quizzes/sports", (req, res) => {
    let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 1 AND isPublic=true`;
    db.query(query)
      .then((data) => {
        console.log(data.rows, "data for sports category");
        const sportsCategory = data.rows;
        const userLogin = "Carlita Bellenger";
        res.render("sports", { sportsCategory, userLogin });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // CELEBRITIES CATEGORY id 4

  router.get("/quizzes/celebrities", (req, res) => {
    let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 4 AND isPublic=true`;
    db.query(query)
      .then((data) => {
        const celebritiesCategory = data.rows;
        const userLogin = "Carlita Bellenger";
        res.render("celebrities", { celebritiesCategory, userLogin });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // ENTARTAINMENT CATEGORY id 5

  router.get("/quizzes/entartainment", (req, res) => {
    let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
      FROM quizzes
      JOIN users ON owner_id = users.id
      JOIN categories ON category_id = categories.id
      WHERE category_id = 5 AND isPublic=true`;
    db.query(query)
      .then((data) => {
        const entartainmentCategory = data.rows;
        const userLogin = "Carlita Bellenger";
        res.render("entartainment", { entartainmentCategory, userLogin });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // VEHICLES CATEGORY id 3

  router.get("/quizzes/vehicles", (req, res) => {
    let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
      FROM quizzes
      JOIN users ON owner_id = users.id
      JOIN categories ON category_id = categories.id
      WHERE category_id = 3 AND isPublic=true`;
    db.query(query)
      .then((data) => {
        const vehiclesCategory = data.rows;
        const userLogin = "Carlita Bellenger";
        res.render("vehicles", { vehiclesCategory, userLogin });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.get("/", (req, res) => {
  //   let quizzesQuery = `SELECT quizzes.name as quiz, users.name as user
  //   FROM quizzes
  //   JOIN users ON owner_id = users.id;`;
  //   let categoriesQuery = `SELECT * FROM categories`;

  //   const quizzesData = db.query(quizzesQuery);
  //   const categoriesData = db.query(categoriesQuery);

  //  // const userLogin = quizzesData.rows[0].user;
  //   //const quizzes = quizzesData.rows;
  //  // const categories = categoriesData.rows;

  //   //console.log(userLogin);
  //  // res.render("index", { quizzes, userLogin, categories });

  //     db.query(query)
  //     .then(data => {
  //       // const templateVars = { urls: userURLs, user: users[req.session['user_id']]};
  //       // const userLogin = data.rows[]; <%= userLogin %>
  //       // console.log(userLogin);
  //       const userLogin = data.rows[0].user;
  //       const quizzes = data.rows;
  //       console.log(quizzes, 'data with users and names');
  //       res.render("index", { quizzes, userLogin });
  //     })
  // .catch(err => {
  //   res
  //     .status(500)
  //     .json({ error: err.message });
  // })
  // })

  // router.get("/quizzes/new", (req, res) => {
  //   let query = `SELECT quizzes.name as quiz, users.name as user
  //                   FROM quizzes
  //                   JOIN users ON owner_id = users.id;`;
  //   db.query(query).then((data) => {
  //     const userLogin = "carla"; //data.rows[0].user;
  //     res.render("create_quiz_form", { userLogin });
  //     //console.log(req.body)
  //   });
  // });

  // // the route should be /quizzes

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

  //   // console.log(req.body)
  //   // [userId, quizNane, categoryId, public/private, completed, score]
  //   const quizValues = [1, quiz_name, 1, true, true, 10];

  //   // questions
  //   const questionValues = [
  //     question1,
  //     question2,
  //     question3,
  //     question4,
  //     question5,
  //   ];

  //   // answers
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

  //   const insertQuiz = function (quizValues) {
  //     const quizQuerry = `INSERT INTO quizzes (owner_id, name, category_id, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, now()::date, $6) RETURNING id AS quiz_id;`;
  //     //return pool
  //     return db
  //       .query(quizQuerry, quizValues)
  //       .then((quizRes) => {
  //         console.log("Quiz ID Created", quizRes.rows, quizRes.rows[0].quiz_id);
  //         return quizRes.rows[0];
  //       })
  //       .catch((err) => console.error("query error", err.stack));
  //   };
  //   const insertQuestions = function (questionValues) {
  //     console.log(`question values: ${questionValues}`);
  //     const questionQuerry = `INSERT INTO questions (question) VALUES ($1), ($2), ($3), ($4), ($5) RETURNING id as question_id;`;
  //     return db
  //       .query(questionQuerry, questionValues)
  //       .then((questionRes) => {
  //         // console.log(`question1 id: ${JSON.stringify(questionRes.rows[0].question_id)}`)
  //         // console.log(`question2 id: ${JSON.stringify(questionRes.rows[1].question_id)}`)
  //         // console.log(`question3 id: ${JSON.stringify(questionRes.rows[2].question_id)}`)
  //         // console.log(`question4 id: ${JSON.stringify(questionRes.rows[3].question_id)}`)
  //         // console.log(`question5 id: ${JSON.stringify(questionRes.rows[4].question_id)}`)
  //         return res.rows;
  //       })
  //       .catch((err) => console.error("query error", err.stack));
  //   };

  //   // INSERT INTO quiz_question (quiz_id, question_id) VALUES ();
  //   // INSERT INTO question_answer (question_id, answer_id) VALUES ();
  //   // INSERT INTO question_option (question_id, option_id) VALUES ();
  //   // INSERT INTO question_option (question_id, option_id) VALUES ();
  //   // INSERT INTO question_option (question_id, option_id) VALUES ();
  //   const quizQuestionValue = [
  //     quizRes.rows[0].quiz_id,
  //     questionRes.rows[0].question_id,
  //   ];

  //   const insertQuizQuestion = function (quizQuestionValue) {
  //     const quizQuestionQuerry = `INSERT INTO quiz_question (quiz_id, question_id) VALUES ($1, $2) RETURNING id AS quizQuestion_id;`;
  //     return db
  //       .query(quizQuestionQuerry, quizQuestionValue)
  //       .then((quizQuestionRes) => {
  //         console.log("quizQuestionRes", quizQuestionRes.rows[0]);
  //         return quizQuestionRes.rows;
  //       })
  //       .catch((err) => console.error("query error", err.stack));
  //   };

  //   insertQuiz(quizValues)
  //     .then(({ quiz_id }) => {
  //       console.log(`QuizId ${quiz_id}`);
  //       insertQuestions(questionValues);
  //       return quiz_id;
  //     })
  //     .then((quiz_id) => {
  //       console.log(`Insert Questions Response: ${quiz_id}`);

  //       insertQuizQuestion(quizQuestionValue).then((quizQuestionResponse) => {
  //         console.log("quizQuestionResponse", quizQuestionResponse);

  //         return {
  //           quiz_id,
  //           quizQuestionResponse,
  //         };
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(`err catch:${e}`);
  //       res.send(e);
  //     });

  //   function (req, res) {
  //     db.tx(async t => { // automatic BEGIN
  //             let data = await t.one('INSERT_1 VALUES(...) RETURNING id', paramValues);
  //             let q = await t.none('INSERT_2 VALUES(...)', data.id);
  //             if (req.body.value != null) {
  //                 return await t.none('INSERT_3 VALUES(...)', data.id);
  //             }
  //             return q;
  //         })
  //         .then(data => {
  //             res.send("Everything's fine!"); // automatic COMMIT was executed
  //         })
  //         .catch(error => {
  //             res.send("Something is wrong!"); // automatic ROLLBACK was executed
  //         });
  // }

  // db.query (async res => {
  //   const quizzesRequest = await res.one(`INSERT INTO quizzes (owner_id, name, category_id, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, now()::date, $6) RETURNING id AS quiz_id;`);
  //   const questionRequest = await res.one(`INSERT INTO questions (question) VALUES ($1) RETURNING id AS question_id;`, quizzesRequest.id);
  //   const optionRequest = await res.one(`INSERT INTO options (option) VALUES ($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15), ($16), ($17), ($18), ($19), ($20) RETURNING id AS option_id;`, questionRequest.id)
  //   return optionRequest;
  // })
  // .then(quizData => {
  //   console.log(quizData.rows, 'quiz_id')
  //   //res.send("Everything's fine!"); // automatic COMMIT was executed

  // })

  // db.tx(t => {
  //   const q1 = t.one('INSERT INTO quizzes (owner_id, name, category_id, isPublic, isReady, date_created, points_allocated) VALUES ($1, $2, $3, $4, $5, now()::date, $6) RETURNING id AS quiz_id', quizValues);
  //   const q2 = t.one('INSERT INTO questions (question) VALUES ($1) RETURNING id AS question_id;', questionValues[0]);

  //   return t.batch([q1, q2]);
  // }).then(data => {
  //   // success, COMMIT was executed
  //   console.log(data.rows)
  // })
  // .catch(error => {
  //     // failure, ROLLBACK was executed
  // });

  // db.query(quizzesRequest, quizValues)
  //       .then(quizData => {
  //console.log(data.rows, 'data rows 1')
  //console.log(quizData.rows[0].quiz_id, 'quiz_id')

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

  //const quizQuestionRequestValue = [data.rows[0].quiz_id]
  // const quizQuestionRequest = `INSERT INTO quiz_question (quiz_id, question_id) VALUES () RETURNING id AS quizQuestion_id;`
  // const quizzesData = await db.query(quizzesRequest, quizValues);
  // const questionData = await db.query(questionRequest, questionValues[0]);
  // const optionData = await db.query(optionRequest, optionValues);

  // res.render("create_quiz_form")
  //console.log(req.body)

  // console.log(userLogin);
  // res.render("index", { quizzes, userLogin, categories });

  //route to a specific QUIZ

  //console.log(quiz_category)
  //function to insert question to the database
  // Remember to include the user_id
  return router;
};
