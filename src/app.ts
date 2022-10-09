var express = require('express');
var cors = require('cors')
var http = require('http');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import { Request, Response, NextFunction } from 'express'

var app = express();
app.use(cors())
require('dotenv').config();
app.use(bodyParser.json())

var server = http.createServer(app);

app.get('/', (req: any, res: any) => {
  res.send('hello world')
})

let port = process.env.port
server.listen(port);

app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());

var mongooseDB = require('mongoose')
const { DB_HOST, DB_USER, DB_PASS } = process.env
mongooseDB.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}.lohsbkk.mongodb.net/?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log('DB Connect');
}).catch((err: any) => {
  console.log('DB Connect fail');
  console.log(err);
})

var auth = require('../src/routes/auth')
app.use('/v1/auth', auth)

var services = require('../src/routes/services')
app.use('/v1/services', services)

var orders = require('../src/routes/orders')
app.use('/v1/orders', orders)

var createError = require('http-errors');
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});