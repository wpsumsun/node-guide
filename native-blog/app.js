const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

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
  
  getPostData(req).then(postData => {
    req.body = postData;
  
    const blogDataResult = handleBlogRouter(req, res);
    if (blogDataResult) {
      blogDataResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }
  
    const userData = handleUserRouter(req, res);
    if (userData) {
      userData.then(blogData => {
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