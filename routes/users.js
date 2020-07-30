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

  // Attempting a specific quiz
  router.get("/quizzes/:id", (req, res) => {
    const quizId = req.params.id;
    // console.log("HELLO", quizId);
    // console.log("YOU ARE HERE", req.params);
    let query = `SELECT  * FROM (SELECT quizzes.name AS name, quizzes.id AS quiz_id, questions.question AS question, options.option AS Options, FALSE as answer
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
    WHERE foo.quiz_id = ${quizId}
    ORDER BY foo.question, foo.answer;
   `;

    db.query(query)
      .then((data) => {
        let templateVars = {
          quizName: data.rows[0].name,
          quizId: data.rows[0].quiz_id,
          questionName1: data.rows[0].question,
          q1o1: data.rows[0].options,
          q1o2: data.rows[1].options,
          q1o3: data.rows[2].options,
          q1a1: data.rows[3].options,
          questionName2: data.rows[4].question,
          q2o1: data.rows[4].options,
          q2o2: data.rows[5].options,
          q2o3: data.rows[6].options,
          q2a2: data.rows[7].options,
          questionName3: data.rows[8].question,
          q3o1: data.rows[8].options,
          q3o2: data.rows[9].options,
          q3o3: data.rows[10].options,
          q3a3: data.rows[11].options,
          questionName4: data.rows[12].question,
          q4o1: data.rows[12].options,
          q4o2: data.rows[13].options,
          q4o3: data.rows[14].options,
          q4a4: data.rows[15].options,
          questionName5: data.rows[16].question,
          q5o1: data.rows[16].options,
          q5o2: data.rows[17].options,
          q5o3: data.rows[18].options,
          q5a5: data.rows[19].options,
        };
        res.render("play_quiz", { templateVars });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  ///users/quizzes/result POST route
  router.post("/quizzes/result", (req, res) => {
    const score = req.body.score;
    const quizId = req.body.quiz_id;
    console.log("THIS IS THE req.body", req.body);
    console.log("THIS IS THE SCORE", score);
    const queryValues = [quizId, 1, score, 10];
    const query = `INSERT INTO completed_quizzes (quiz_id, player_id, score, completed_date, points_gotten) VALUES ($1, $2, $3, now()::date, $4) RETURNING *;`;

    db.query(query, queryValues)
      .then((res) => {})
      .catch((err) => console.error("query error", err.stack));

    res.render("results-box", { score });
  });

  // Root api/users
  router.get("/", (req, res) => {
    let query = `SELECT quizzes.name as quiz, quizzes.id as quizId, users.name as user, users.id as userId, categories.name as category
                    FROM quizzes
                    JOIN users ON owner_id = users.id
                    JOIN categories ON category_id = categories.id`;
    db.query(query)
      .then((data) => {
        //const templateVars = { urls: userURLs, user: users[req.session['user_id']]};
        //const userLogin = data.rows[]; <%= userLogin %>
        const userId = data.rows[0].userid;
        const userLogin = data.rows[0].user;
        console.log(data.rows);
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

    let query = `SELECT quizzes.name as quiz, quizzes.id as quiz_id date_created as Created, users.name as Creator
                FROM quizzes
                JOIN users ON owner_id = users.id
                WHERE quizzes.owner_id = ${userId}
                ORDER BY created DESC`;
    db.query(query)
      .then((data) => {
        // const userLogin = data.rows[0].user;
        const userLogin = data.rows[0].creator;
        const myQuizzes = data.rows;
        console.log("MY QUIZZES", data.rows);
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

  return router;
};
