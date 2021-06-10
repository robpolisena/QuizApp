let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL || postgres://aqzslwihrgqwci:77ee31bf11f0db5804ec11fdce7fafcd6bf064163ec24e53f9104481f0bc66f6@ec2-34-232-191-133.compute-1.amazonaws.com:5432/d4cp110qa5vggh
  ssl: true;
  // ssl: {
  //   rejectUnauthorized: false;
  // }
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
