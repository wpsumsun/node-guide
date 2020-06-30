const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "标题1",
      content: "内容1",
      createdTime: 1593530757350,
      author: "张三",
    },
    {
      id: 2,
      title: "标题2",
      content: "内容2",
      createdTime: 1593540757350,
      author: "李四",
    },
  ];
};

module.exports = {
  getList
};