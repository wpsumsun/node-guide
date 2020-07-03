const { getList, getBlog, createBlog, updateBlog, removeBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  
  //获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query || {};
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData);
    });
  }
  
  //获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const { id } = req.query;
    const blog = getBlog(id);
    return new SuccessModel(blog);
  }
  
  //新建博客
  if (method === "POST" && req.path === "/api/blog/create") {
    const blog = createBlog(req.body);
    return new SuccessModel(blog);
  }
  
  //更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const { id } = req.query;
    const result = updateBlog(id, req.body);
    return new SuccessModel(result);
  }
  
  //删除博客
  if (method === "DELETE" && req.path === "/api/blog/delete") {
    const { id } = req.query;
    const result = removeBlog(id);
    return new SuccessModel(result);
  }
};

module.exports = handleBlogRouter;