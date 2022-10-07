var express = require('express')
var router = express.Router()

router.get('/', (req: any, res: any) => {
  res.send('hello world2')
})

module.exports = router