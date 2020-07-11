const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
client.on("error", function(error) {
  console.error(error);
});

function set(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  client.set(key, value, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (error, value) => {
      if (error) {
        reject(error);
        return;
      }
      if (value === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(value));
      } catch (err) {
        resolve(value);
      }
        
      }
    });
  });
}

module.exports = {
  set,
  get
};