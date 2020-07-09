const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const SESSION_DADA = {};

const getExpires = () => {
  const date = new Date();
  date.setTime(Date.now() + 24 * 60 *60 * 1000);
  return date.toGMTString();
};

const getPostData = function(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandler = (req, res) => {
  res.setHeader("Content-type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);
  
  req.cookie = {};
  const cookieString = req.headers.cookie || "";
  cookieString.split(";").forEach(item => {
    if (!item) return;
    const [key, value] = item.split("=");
    req.cookie[key.trim()] = value.trim();
  });
  
  let userId = req.cookie.userId;
  let needSetCookie = false;
  if (userId) {
    if (!SESSION_DADA[userId]) {
      SESSION_DADA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}`;
    SESSION_DADA[userId] = {};
  }
  
  req.session = SESSION_DADA[userId];
  
  getPostData(req).then(postData => {
    req.body = postData;
  
    const blogDataResult = handleBlogRouter(req, res);
    if (blogDataResult) {
      blogDataResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userId=${userId};path=/;httpOnly;Expires=${getExpires()}`);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
  
    const userData = handleUserRouter(req, res);
    if (userData) {
      userData.then(blogData => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userId=${userId};path=/;httpOnly;Expires=${getExpires()}`);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
  
    // 404
    res.writeHead(404, { "content-type": "text/plain;charset=utf-8" });
    res.end("走失了~");
  });
};

module.exports = serverHandler;