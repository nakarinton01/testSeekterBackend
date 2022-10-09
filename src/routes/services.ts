var express = require('express')
var router = express.Router()
const servicesModel = require('../model/services')
const bookingsModel = require('../model/booking')
const verifyToken = require('../middleware/jwtDecode')
import { Request, Response } from 'express'

router.post('/',async function(req: Request, res: Response) {
  try{
    let { name, price, picture, description } = req.body
    const service: { name: String, price: Number, picture: String, description: String,  } = {
      name,
      price,
      picture,
      description
    }
    let newService = new servicesModel(service)
    await newService.save()
    return res.status(200).send({
      success: true,
      result: 'insert success'
    })
  } catch (error: any) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

router.get('/',async function(req: Request, res: Response) {
  try{
    let services = await servicesModel.find({}, { __v : 0})
    return res.status(200).send(services)
  } catch (error: any) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

router.get('/:service_id',async function(req: Request, res: Response) {
  try{
    let service_id = req.params.service_id
    let services = await servicesModel.findOne({ _id: service_id }, { __v : 0})
    return res.status(200).send(services)
  } catch (error: any) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

router.post('/:service_id/booking', verifyToken,async function(req: Request, res: Response) {
  try{
    let service_id = req.params.service_id
    let services = await servicesModel.findOne({ _id: service_id }, { __v : 0})
    const newBooking = new bookingsModel({
      service: services,
      customer: res.locals.auth,
      createdAt: new Date
    })
    await newBooking.save()
    return res.status(200).send({
      success: true,
      result: 'booking success'
    })
  } catch (error: any) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

module.exports = router