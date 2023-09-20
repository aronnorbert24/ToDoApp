import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
const { secretToken } = require('../dotenv.config')

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log('Middleware token: ' + token)
  if (!token) return res.status(401).send('You are unauthorized to perform this action.')

  jwt.verify(token, secretToken, (err: any) => {
    console.error('This is err: ' + err)
    if (err) return res.status(403).send('You are unauthorized to perform this action')
  })
  next()
}
