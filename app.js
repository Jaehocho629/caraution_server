var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
// dotenv
require('dotenv').config()

// passport import
const passport = require('./passportConfig');

const apiRouter = require('./routes/apis');


// Cookie & Session
// Cookie는? 브라우저(클라이언트)에 저장하는 데이터 조각.
var app = express();
app.use(cors());


const session = require('express-session');
app.use(session({
  resave: true, // session 수정 안되었어도, 다시 저장할지 여부 
  saveUninitialized: true, // 세션이 만들어지지 않아도 저장.(기록되지 않아도)
  secret: 'some random value',
  //  cookie: { secure: true }
}))

const { sequelize } = require('./models');
sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("연결 성공!");
}).catch(err => {
  console.error(err);
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/auth', authRouter);

app.use(passport.initialize());


app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`Error 발생 \n\n ${err.message}`);
  // res.render('error');
});

module.exports = app;