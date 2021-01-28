const http = require("http");
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: [],
    }
  }
  
  register(...args) {
    const info = {};
    const path = args[0];
    if (typeof path === "string") {
      info.path = path;
      info.stack = slice.call(arguments, 1);
    } else {
      info.path = "/";
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }
  
  use() {
    const info = this.register(...arguments);
    this.routes.all.push(info);
  }
  
  get() {
    const info = this.register(...arguments);
    this.routes.get.push(info);
  }
  
  post() {
    const info = this.register(...arguments);
    this.routes.post.push(info);
  }
  
  match(method, path) {
    let stack = [];
    
    if (path === "/facicon.ico") {
      return stack;
    }
    
    let currentRoutes = [];
    currentRoutes = currentRoutes.concat(this.routes.all);
    currentRoutes = currentRoutes.concat(this.routes[method]);
    currentRoutes.forEach(routeInfo => {
      if (routeInfo.path.indexOf(path) === 0) {
        stack = stack.concat(routeInfo.stack);
      }
    });
    
    return stack;
  }
  
  handle(req, res, stack) {
    const next = () => {
      const middleware = stack.shift();
      if (middleware) {
        middleware(req, res, next);
      }
    };
    
    next();
  }
  
  serverHandler() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };
      
      const url = req.url;
      const method = req.method.toLowerCase();
      const stack = this.match(method, url);
      this.handle(req, res, stack);
    }
  }
  
  listen(...args) {
    const server = http.createServer(this.serverHandler());
    server.listen(...args);
  }
  
}

module.exports = () => {
  return new LikeExpress();
};