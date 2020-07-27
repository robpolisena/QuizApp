let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports = dbParams;

const getQuizzes = function (req, res) {
  const queryString = 'SELECT quizzes.name FROM quizzes;'
  return pool.query(queryString)
    .then(res => res.rows);
};
exports.getQuizzes = getQuizzes;
