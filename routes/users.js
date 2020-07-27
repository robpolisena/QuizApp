/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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
                  router.get("/test", (req, res) => {
                    let query = `SELECT *
                  FROM quizzes;`;
                    db.query(query)
                      .then(data => {
                        const quizzes = data.rows;
                        res.send(quizzes)
                        // res.render("urls_list_of_quizzes", quizzes);
                       // res.send({user: {name: user.name, email: user.email, id: userId}});
                      })
                      .catch(err => {
                        res
                          .status(500)
                          .json({ error: err.message });
                      })
                    })

router.get('/prop', (req, res) => {
  const queryString = 'SELECT quizzes.name FROM quizzes;'
  return pool.query(queryString)
    .then(res => res.rows);
  //db.getQuizzes(req.queryString)
 // .then(quizzes => res.send({quizzes}))
  //.catch(e => {
    //console.error(e);
    //res.send(e)
  })

  return router
}
