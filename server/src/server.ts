import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from './dotenv.config'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

dotenv.config()

const database: string = config.database
const connectionString: string = config.connectionString

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
const port: string = config.port

app.get('/', function (req: Request, res: Response) {
  res.send('Hey Bro!')
})

app.listen(port, () => console.log(port))
