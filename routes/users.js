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
const saltRounds = 10;

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

//app.use(cookieParser());
app.set("view engine", "ejs");

module.exports = (db) => {
  //retrieve username
  const userName = async (userid) => {
    let query = `SELECT users.name as userName
      FROM users
      WHERE users.id = ${userid}`;
    return await db.query(query).then((data) => {
      return data.rows[0].username;
    });
  };

  // const users = {
  //   "userRandomID": {
  //     id: "userRandomID",
  //     email: "user@example.com",
  //     password: bcrypt.hashSync("purple-monkey-dinosaur", saltRounds),
  //   },
  //   "user2RandomID": {
  //     id: "user2RandomID",
  //     email: "user2@example.com",
  //     password: bcrypt.hashSync("dishwasher-funk", saltRounds),
  //   }
  // };

  const findEmail = async (email) => {
    //console.log(`email from find userbyemai: ${email}`)
    let values = [email];
    let query = `SELECT email FROM users WHERE email = $1;`;

    return await db.query(query, values).then((data) => {
      //console.log(data, 'email data')
      return data.rows[0];
      //console.log(data.rows);
      // //const userId = data.rows[0].userid;
      // if (email === data.row[0].email ) {
      //   return true;
      //   //console.log('false, email doesnt exist')
      // }
      //   return false
      //   console.log('true, email  exists in db')
    });
  };

  const findUserByEmail = (email) => {
    //console.log(`email from find userbyemai: ${email}`)
    let values = [email];
    let query = `SELECT * FROM users WHERE email = $1;`;
    return db
      .query(query, values)
      .then((data) => {
        //console.log(data.rows[0].email);

        //console.log(`users from get user: ${JSON.stringify(data.rows)}`);
        return data.rows[0];
      })
      .catch((err) => console.log(`err at finduser: ${err}`));
  };

  // Root api/users
  router.get("/", (req, res) => {
    console.log(req.session);
    if (!req.session["user_id"]) {
      res.redirect("/users/register");
    } else {
      res.redirect("/users/quizzes");
    }
  });

  // Login page
  router.get("/login", (req, res) => {
    // let templateVars = { user: users[req.session['user_id']]};
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
      let templateVars = { user: [req.session["user_id"]] };

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
          //console.log(data.rows);
          const quizzes = data.rows;
          //console.log(quizzes, 'data with users and names');
          res.render("index", { quizzes, userLogin, userId, templateVars });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.redirect("/login");
    }
  });

  // Completed Quizzes
  router.get("/myCompletedQuizzes", (req, res) => {
    const idForUser = req.session["user_id"].user_id;
    userName(idForUser).then((person) => {
      let query = `SELECT quizzes.name as quiz, completed_quizzes.completed_date as date, completed_quizzes.score as score
      FROM quizzes
      JOIN completed_quizzes ON quiz_id = quizzes.id
      WHERE quizzes.owner_id = ${idForUser}
      ORDER BY date DESC`;
      db.query(query)
        .then((data) => {
          //const userLogin = data.rows[0];
          console.log(data.rows);
          const myQuizzes = data.rows;
          console.log(myQuizzes, "myQuizzes");
          res.render("completed-quizzes", { myQuizzes, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // Root api/users
  // router.get("/", (req, res) => {
  //   let query = `SELECT quizzes.name as quiz, quizzes.id as quizId, users.name as user, users.id as userId, categories.name as category
  //                   FROM quizzes
  //                   JOIN users ON owner_id = users.id
  //                   JOIN categories ON category_id = categories.id`;
  //   db.query(query)

  // Most Recent
  router.get("/myQuizzes/:id", (req, res) => {
    const userId = req.params.id;

    let query = `SELECT quizzes.name as quiz, quizzes.id as quiz_id, date_created as Created, users.name as Creator
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
    const userId = req.session["user_id"].user_id;
    userName(userId).then((person) => {
      let query = `SELECT quizzes.name as quiz, date_created as Created
                  FROM quizzes
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
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
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

          res.render("popular", { popularQuizzes, person, userId });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // ANIMALS CATEGORY id 2

  router.get("/quizzes/animals", (req, res) => {
    // console.log(req.session['user_id'].user_id, 'req.session USER id')
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category
        FROM quizzes
        JOIN users ON owner_id = users.id
        JOIN categories ON category_id = categories.id
        WHERE category_id = 2 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          console.log(data.rows[0]);
          const animalsCategory = data.rows;
          //const userLogin = "Carlita Bellenger";
          res.render("animals", { animalsCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // SPORTS CATEGORY id 1

  router.get("/quizzes/sports", (req, res) => {
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 1 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          console.log(data.rows, "data for sports category");
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
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 4 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          const celebritiesCategory = data.rows;
          const userLogin = "Carlita Bellenger";
          res.render("celebrities", { celebritiesCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // ENTARTAINMENT CATEGORY id 5

  router.get("/quizzes/entartainment", (req, res) => {
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
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

  // ANIMALS CATEGORY id 2

  router.get("/quizzes/animals", (req, res) => {
    // console.log(req.session['user_id'].user_id, 'req.session USER id')
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category
        FROM quizzes
        JOIN users ON owner_id = users.id
        JOIN categories ON category_id = categories.id
        WHERE category_id = 2 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          console.log(data.rows[0]);
          const animalsCategory = data.rows;
          //const userLogin = "Carlita Bellenger";
          res.render("animals", { animalsCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // SPORTS CATEGORY id 1

  router.get("/quizzes/sports", (req, res) => {
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 1 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          console.log(data.rows, "data for sports category");
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
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
    FROM quizzes
    JOIN users ON owner_id = users.id
    JOIN categories ON category_id = categories.id
    WHERE category_id = 4 AND isPublic=true`;
      db.query(query)
        .then((data) => {
          const celebritiesCategory = data.rows;
          const userLogin = "Carlita Bellenger";
          res.render("celebrities", { celebritiesCategory, person });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // ENTARTAINMENT CATEGORY id 5

  router.get("/quizzes/entartainment", (req, res) => {
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
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

  // VEHICLES CATEGORY id 3

  router.get("/quizzes/vehicles", (req, res) => {
    const userid = req.session["user_id"].user_id;
    userName(userid).then((person) => {
      let query = `SELECT quizzes.name as quiz, categories.name as category, users.name as creator
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
    console.log("THIS IS THE QUIZ ID", quizId);

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
          quizId: req.params.id,
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
        // console.log(templateVars,'templateVars')       // console.log(templateVars5,'templateVars5')

        res.render("play_quiz", { templateVars });
        //  res.render("play_quiz", { templateVars }, { templateVars2 }, { templateVars3 }, { templateVars4 }, { templateVars5 });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/quizzes/result", (req, res) => {
    console.log("THIS IS WHERE YOU ARE", req.body);
    const score = req.body.score;
    const quizId = req.body.quiz_id;
    res.render("results-box", { score });
  });
  // valid if a user with this email exists
  const authenticateUser = (email, password) => {
    // const user = findUserByEmail(email);
    // check the email match

    return findUserByEmail(email).then((user) => {
      // console.log(`user: ${JSON.stringify(user)} email: ${email} password: ${password}`)
      console.log("before bcrypt");
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log("after bcrypt");
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
      return;
    });

    let { name, email, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password, saltRounds);
    let userValues = [name, email, hashedPassword];

    const insertUser = function (userValues) {
      const usersQuerry = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id AS user_id;`;
      //return pool
      return db
        .query(usersQuerry, userValues)
        .then((userRes) => {
          //console.log("Quiz ID Created", quizRes.rows, quizRes.rows[0].quiz_id);
          console.log(`userRessaved: ${JSON.stringify(userRes)}`);
          return userRes.rows[0];
        })
        .catch((err) => console.error("query error", err.stack));
    };

    insertUser(userValues).then((user_id) => {
      // console.log(bcrypt.compareSync(req.body.password, users[userId].password));
      req.session["user_id"] = user_id;
      res.redirect("/users/quizzes");
    });
  });

  // Login the user
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Authentication the user
    // const user = authenticateUser(email, password);
    authenticateUser(email, password)
      .then((user) => {
        //console.log(`user from authenticate user: ${JSON.stringify(user)}`)
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
    console.log("Logout happens");
    //clear the cookies on logout
    req.session = null;
    res.redirect("/users/login");
  });
  return router;
};
