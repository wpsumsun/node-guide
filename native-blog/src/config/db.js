const model = process.env.NODE_ENV;

let MYSQL_CONFIG = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "12345678",
  database: "myblogs",
};

if (model === "prod") {
  MYSQL_CONFIG = {
    host: "localhost",
      port: "3306",
    user: "root",
    password: "12345678",
    database: "myblogs",
  }
}

module.exports = {
  MYSQL_CONFIG
};