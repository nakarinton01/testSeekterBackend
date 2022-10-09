var express = require('express')
var router = express.Router()
const usersModel = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { Request, Response } from 'express'


router.post('/register',async function(req: Request, res: Response) {
  try{
    let { fullName, username, password } = req.body
    // let fullName: String = req.body.fullName
    let users = await usersModel.findOne({username: username})
    if (users) throw new Error('username is already')

    let hashPassword = await bcrypt.hash(password, 10)
    const user: { fullName: String, username: String, password: String, createdAt: Date } = {
      fullName,
      username,
      password: hashPassword,
      createdAt: new Date()
    }
    let newUsers = new usersModel(user)
    await newUsers.save()
    return res.status(200).send({
      success: true,
      result: 'registy success'
    })
  } catch (error: any) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

router.post('/signin', async function(req: Request, res: Response ) {
  try{
    var { username, password } = req.body
    let users = await usersModel.findOne({username: username})
    if (!users) throw new Error('login fail')
    let checkPassword = await bcrypt.compare(password, users.password)
    if (!checkPassword) throw new Error('login fail')
    const token = jwt.sign({_id: users._id, fullName: users.fullName, username}, process.env.JWT_KEY)
    return res.status(200).send({
      success: true,
      result: 'login success',
      token
    })

  }catch (error: any) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
})

module.exports = router