var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var IndexRouter = require('./routes/IndexRouter');
var UsuariosRouter = require('./routes/UsuariosRouter');
var BookRouter = require('./routes/BookRouter');
var MeetingRouter = require('./routes/MeetingRouter');
var SwapRouter = require('./routes/SwapRouter');
var MyAcoountRouter = require('./routes/myaccount');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));

app.use('/', IndexRouter);
app.use('/', UsuariosRouter);
app.use('/', BookRouter);
app.use('/meetings', MeetingRouter);
app.use('/swaps', SwapRouter);
app.use('/myaccount', MyAcoountRouter);


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