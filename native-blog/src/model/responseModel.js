class BaseModel  {
  constructor(data, message) {
    if (typeof data === "string") {
      this.message = message;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message = "成功") {
    super(data, message);
    this.code = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message = "失败") {
    super(data, message);
    this.code = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};