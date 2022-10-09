var express = require('express')
var router = express.Router()
const bookingsModel = require('../model/booking')
const verifyToken = require('../middleware/jwtDecode')
import { Request, Response } from 'express'

router.get('/', verifyToken,async function(req: Request, res: Response) {
  try{
    let username = res.locals.auth.username
    let bookings = await bookingsModel.find({ 'customer.username': username }, { __v : 0})
    return res.status(200).send(bookings)
  } catch (error: any) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

module.exports = router