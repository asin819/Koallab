let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let base = require('./bin/base');

require('./bin/initdb');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let tasksRouter = require('./routes/task_ares');
let logsRouter = require('./routes/logs');
let groupsRouter = require('./routes/groups');
let projectsRouter = require('./routes/projects');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Origin,Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Check the legitimacy of each request
app.use(base.checkReq);

// khakikoalas's business handle here
app.use('/', indexRouter);
app.use('/', usersRouter);

app.use('/', tasksRouter);
app.use('/', logsRouter);
app.use('/', groupsRouter);
app.use('/', projectsRouter);


if (process.env.NODE_ENV === 'production') {
  console.log('Running in production!');

  // Make all files in that folder public
  app.use(express.static(path.join(__dirname, '../../koallab/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../koallab/dist/index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));

  res.end(base.mkBizMsg("fail", "The API did not exist:" + req.originalUrl));

});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

