var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
// mongoose.connect('mongodb://localhost/dbphotogallery',function(err){
// if(err) throw err
// });

mongoose.connect(
  "mongodb://127.0.0.1:27017/dbphotogallery",{ useNewUrlParser: true,useUnifiedTopology: true}
).catch((e) => {
  console.log("error connecting to mongoose!");
});
mongoose.connection.on("error", (e) => {
  console.log("mongo connect error!");
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/uploads'));
app.use(cors())
app.use('/', indexRouter);

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
