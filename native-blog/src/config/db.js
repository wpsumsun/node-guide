const model = process.env.NODE_ENV;

let MYSQL_CONFIG = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "12345678",
  database: "myblogs",
};

let REDIS_CONFIG = {
  host: "localhost",
  port: "6379"
};

if (model === "prod") {
  MYSQL_CONFIG = {
    host: "localhost",
      port: "3306",
    user: "root",
    password: "12345678",
    database: "myblogs",
  };
  REDIS_CONFIG = {
    host: "localhost",
    port: "6379"
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
};