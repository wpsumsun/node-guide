var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== "production") {
  app.use(logger('dev'));
} else {
  const logFileName = path.join(__dirname, "logs", "access.log");
  const accessLogStream = fs.createWriteStream(logFileName, { flags: 'a' });
  app.use(logger('combined', { stream: accessLogStream }));
}
// app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require("./db/redis");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  store: new RedisStore({ client: redisClient }),
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
