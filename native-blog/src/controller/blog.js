const { exec } = require("../db/mysql");
const getList = (author, keyword) => {
  let sql = `select id, title, content, createtime, author from blogs where 1=1 `;
  if (author) sql += `and author like '%${author}%' `;
  if (keyword) sql += `and title like '%${keyword}%' `;
  sql += `order by createtime desc;`;
  return exec(sql);
};

const getBlog = (id) => {
  const sql = `select * from blogs where id=${id};`;
  return exec(sql).then(rows => {
    return rows[0];
  });
};

const createBlog = ({ title = "", content = "", author = "" }) => {
  const createtime = Date.now();
  const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}');`;
  return exec(sql).then(innsertData => {
    return { id: innsertData.insertId };
  });
};

const updateBlog = ({ id, title, content, author }) => {
  const sql = `update blogs set title='${title}', content='${content}' where id=${id} and author='${author}';`;
  return exec(sql).then(result => {
    return result.affectedRows > 0
  });
};

const removeBlog = ({id, author}) => {
  // 实际项目中应该使用逻辑删除
  const sql = `delete from blogs where id=${id} and author='${author}';`;
  return exec(sql).then(result => {
    return result.affectedRows > 0
  });
};


module.exports = {
  getList,
  getBlog,
  createBlog,
  updateBlog,
  removeBlog
};