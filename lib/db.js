let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString =
    process.env.DATABASE_URL ||
    "postgres://lhrtdtexxnbdiy:2f10e465b4029f400718a7ee206f7c077705f68a4075d37f15a15ef1d291908a@ec2-34-195-143-54.compute-1.amazonaws.com:5432/d506rrktljhk0a";
  ssl: true;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

module.exports = dbParams;
