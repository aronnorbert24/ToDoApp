import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/router'
const { database, connectionString, port } = require('./dotenv.config')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

dotenv.config()

mongoose
  .connect(connectionString, {
    retryWrites: true,
    w: 'majority',
    dbName: database,
  })
  .then(() => {
    console.log('Connected to MongoDB database ' + mongoose.connection.name)
  })
  .catch((error: any) => {
    console.error('Failed to connect to MongoDB database', error)
  })

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }

  next()
})

app.use('/', router)

app.listen(port, () => console.log(port))
