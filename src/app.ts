var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors())
require('dotenv').config();

app.get('/', (req: any, res: any) => {
  res.send('hello world')
})

app.listen(process.env.DB_POST)


var test = require('../src/routes/test')
app.use('/v1/test', test)
