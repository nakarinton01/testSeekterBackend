const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express'

module.exports = ( req: Request, res: Response, next: NextFunction ) => {
  try{
    const token = req.headers.authorization
    let spToken: String = ''
    if(token) {
      spToken = token.split('Bearer ')[1]
    } else {
      throw new Error()
    }
    const decode = jwt.verify(spToken, process.env.JWT_KEY)
    res.locals.auth = decode
    return next()
  } catch (error: any) {
    return res.status(400).send({
      success: false,
      message: 'Auth fail'
    })
  }
}