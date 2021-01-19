const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisClient.on("error", function(error) {
  console.error(error);
});

module.exports = redisClient;