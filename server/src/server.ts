const express = require('express')
const request = express.Request
const response = express.Response
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

dotenv.config()

const username: string = process.env.MONGO_USER!
const password: string = process.env.MONGO_PASSWORD!
const database: string = process.env.DB_NAME!
const connectionString: string = `mongodb+srv://${username}:${password}@wgclusterlearn.gr0pdlo.mongodb.net`

async function start() {
  await mongoose
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
  const port: string = process.env.PORT!
  app.listen(port, () => console.log(port))
}

start()

app.get('/', function (req: typeof request, res: typeof response) {
  res.send('Hey Bro!')
})
