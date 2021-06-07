/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const dbParams = require("../lib/db");
const router = express.Router();
const app = express();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const { request } = require("express");
const quizzes = require("./quizzes");
const saltRounds = 10;

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.set("view engine", "ejs");

module.exports = (db) => {
  // prevent XSS client-side in JavaScript
  const htmlEncode = function (str) {
    //function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
      return "&#" + c.charCodeAt(0) + ";";
    });
  };

  //retrieve username
  const userName = async (userid) => {
    let query = `SELECT users.name as userName
      FROM users
      WHERE users.id = ${userid}`;
    return await db
      .query(query)
      .then((data) => {
        return data.rows[0].username;
      })
      .catch((err) => {
        console.log(err, "first userName error");
      });
  };

  // query to see if email already exists in table when a user registers
  const findEmail = async (email) => {
    let values = [email];
    let query = `SELECT email FROM users WHERE email = $1;`;

    return await db.query(query, values).then((data) => {
      return data.rows[0];
    });
  };

  // query to
  const findUserByEmail = (email) => {
    let values = [email];
    let query = `SELECT * FROM users WHERE email = $1;`;
    return db
      .query(query, values)
      .then((data) => {
        return data.rows[0];
      })
      .catch((err) => console.log(`err at finduser: ${err}`));
  };

  // Root api/users
  router.get("/", (req, res) => {
    if (!req.session["user_id"]) {
      res.redirect("/users/register");
    } else {
      res.redirect("/users/quizzes");
    }
  });

  // Login page
  router.get("/login", (req, res) => {
    res.render("urls_login");
  });

  // Registration page
  router.get("/register", (req, res) => {
    let templateVars = { user: [req.session["user_id"]] };
    res.render("urls_signup", templateVars);
  });

  // main page
  router.get("/quizzes", (req, res) => {
    if (req.session["user_id"]) {
      const userId = req.session["user_id"];
      userName(userId).then((person) => {
        let query = `SELECT quizzes.name as quiz, quizzes.id as quizId, users.name as user, users.id as userId, categories.name as category
        FROM quizzes
        JOIN users ON owner_id = users.id
        JOIN categories ON category_id = categories.id WHERE quizzes.isPublic = true`;
        db.query(query)
          .then((data) => {
            const quizzes = data.rows;
            res.render("index", { quizzes, person, userId });
          })
          .catch((err) => {
            console.log("ERROW=====>", err);
            res.status(500).json({ error: err.message });
          });
      });
    } else {
      res.redirect("/login");
    }
  });

  router.get("/myCompletedQuizzes", (req, res) => {
    const idForUser = req.session["user_id"];
    userName(idForUser).then((person) => {
      const query = `SELECT quizzes.name AS quiz, quizzes.id as quizid, score, completed_date AS date
      FROM completed_quizzes
      JOIN quizzes ON completed_quizzes.quiz_id = quizzes.id
      WHERE player_id = $1
      ORDER BY date desc;`;
      const queryValue = [idForUser];
      db.query(query, queryValue)
        .then((data) => {
          if (data.rows.length > 0) {
            const myQuizzes = data.rows;
            res.render("completed-quizzes", { myQuizzes, person, idForUser });
          } else {
            res.render("completed-quizzes", {
              myQuizzes: [],
              person,
              idForUser,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // Most Recent
  router.get("/myQuizzes/:id", (req, res) => {
    const userId = req.session["user_id"];
    userName(userId).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quiz_id, date_created as Created, users.name as Creator
                FROM quizzes
                JOIN users ON owner_id = users.id
                WHERE quizzes.owner_id = ${userId}
                ORDER BY created DESC`;
      db.query(query)
        .then((data) => {
          if (data.rows.length > 0) {
            const myQuizzes = data.rows;
            const person = data.rows[0].creator;
            res.render("my_quizzes", { myQuizzes, person, userId });
          } else {
            res.render("my_quizzes", { myQuizzes: [], person, userId });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // Most Recent
  router.get("/quizzes/recent", (req, res) => {
    const userId = req.session["user_id"];
    userName(userId).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quizid, date_created as Created
                  FROM quizzes WHERE isPublic = true
                  ORDER BY created DESC`;
      db.query(query)
        .then((data) => {
          const recentQuizzes = data.rows;
          res.render("recent", { recentQuizzes, person, userId });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // POPULAR
  router.get("/quizzes/popular", (req, res) => {
    const userid = req.session["user_id"];
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quizid, count(completed_quizzes.*) as attempts, quizzes.owner_id as userId
                  FROM quizzes
                  JOIN completed_quizzes ON quizzes.id = completed_quizzes.quiz_id WHERE isPublic = true
                  GROUP BY quizzes.name, quizzes.owner_id, quizzes.id
                  ORDER BY attempts DESC`;
      db.query(query)
        .then((data) => {
          const userId = data.rows[0].userid;
          const popularQuizzes = data.rows;
          res.render("popular", { popularQuizzes, person, userId });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // ANIMALS CATEGORY id 2
  router.get("/quizzes/animals", (req, res) => {
    const userid = req.session["user_id"];
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quizid, users.name as creator, categories.name as category
        FROM quizzes
        JOIN users ON owner_id = users.id
        JOIN categories ON category_id = categories.id
        WHERE category_id = 2 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          const animalsCategory = data.rows;
          res.render("animals", { animalsCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // SPORTS CATEGORY id 1
  router.get("/quizzes/sports", (req, res) => {
    const userid = req.session["user_id"];
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quizid, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 1 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          const sportsCategory = data.rows;
          res.render("sports", { sportsCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // CELEBRITIES CATEGORY id 4
  router.get("/quizzes/celebrities", (req, res) => {
    const userid = req.session["user_id"];
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quizid, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 4 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          const celebritiesCategory = data.rows;
          res.render("celebrities", { celebritiesCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // ENTARTAINMENT CATEGORY id 5
  router.get("/quizzes/entartainment", (req, res) => {
    const userid = req.session["user_id"];
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quizid, categories.name as category, users.name as creator
      FROM quizzes
      JOIN users ON owner_id = users.id
      JOIN categories ON category_id = categories.id
      WHERE category_id = 5 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          const entartainmentCategory = data.rows;
          res.render("entartainment", { entartainmentCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  router.get("/quizzes/vehicles", (req, res) => {
    const userid = req.session["user_id"];
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, quizzes.id as quizid, categories.name as category, users.name as creator
      FROM quizzes
      JOIN users ON owner_id = users.id
      JOIN categories ON category_id = categories.id
      WHERE category_id = 3 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          const vehiclesCategory = data.rows;
          res.render("vehicles", { vehiclesCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // Attempting a specific quiz
  router.get("/quizzes/:id", (req, res) => {
    const quizId = req.params.id;
    const userId = req.session["user_id"];
    userName(userId).then((person) => {
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

          res.render("play_quiz", { templateVars, person, userId, quizId });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  const authenticateUser = (email, password) => {
    return findUserByEmail(email).then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      } else {
        return false;
      }
    });
  };

  router.post("/register", async (req, res) => {
    if (req.body.email === "") {
      res
        .status(400)
        .send(
          "Error: Please enter a valid email, please click your back button to continue"
        );
    }
    if (req.body.password === "") {
      res
        .status(400)
        .send(
          "Error: Please enter a password, please click your back button to continue"
        );
    }
    findEmail(req.body.email).then((row) => {
      if (row.email === req.body.email) {
        res.status(400).send("Error: This email already exists!");
      }
      return res.end();
    });

    let { name, email, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password, saltRounds);
    let userValues = [name, email, hashedPassword];

    const insertUser = function (userValues) {
      const usersQuerry = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id AS user_id;`;
      return db
        .query(usersQuerry, userValues)
        .then((userRes) => {
          return userRes.rows[0];
        })
        .catch((err) => console.error("query error", err.stack));
    };

    insertUser(userValues)
      .then((result) => {
        req.session["user_id"] = result.user_id;

        res.redirect("/users/quizzes");
      })
      .catch((e) => {
        console.log("error occured while creating user", e);
      });
  });

  // Login the user
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    authenticateUser(email, password)
      .then((user) => {
        if (user) {
          req.session["user_id"] = user.id;
          res.redirect("/users/quizzes");
        } else {
          res.status(403).send("Error: You have entered invalid credentials");
          res.redirect("/register");
        }
      })
      .catch((err) => console.log(`err on auth user: ${err}`));
  });

  //logout the user
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/users/login");
  });
  return router;
};
