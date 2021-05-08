const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const organizationRouter = require ('./routes/organization');
const contactRouter = require('./routes/contact');
const backofficeRouter = require('./routes/backoffice');
const activitiesRouter = require('./routes/activities');
const categoriesRouter = require('./routes/category');
const noveltyRouter = require('./routes/novelty')

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/backoffice', backofficeRouter);
app.use('/auth', loginRouter);
app.use('/organizations', organizationRouter);
app.use('/contacts', contactRouter);
app.use('/activities', activitiesRouter);
app.use('/categories', categoriesRouter);
app.use('/news', noveltyRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
