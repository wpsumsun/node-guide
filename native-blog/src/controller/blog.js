const { exec } = require("../db/mysql");
const getList = (author, keyword) => {
  let sql = `select id, title, content, createtime, author from blogs where 1=1 `;
  if (author) sql += `and author like '%${author}%' `;
  if (keyword) sql += `and title like '%${keyword}%' `;
  sql += `order by createtime desc;`;
  return exec(sql);
};

const getBlog = (id) => {
  return {
    id: 1,
    title: "标题1",
    content: "内容1",
    createdTime: 1593530757350,
    author: "张三",
  };
};

const createBlog = (postData) => {
  return {
    id: 3,
  };
};

const updateBlog = (id, postData = {}) => {
  return true;
};

const removeBlog = (id) => {
  return true;
};


module.exports = {
  getList,
  getBlog,
  createBlog,
  updateBlog,
  removeBlog
};