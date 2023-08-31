const express = require('express')
const request = express.Request
const response = express.Response
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

dotenv.config()

const connectionString: string = process.env.CONNECTION_STRING!

async function start() {
  await mongoose
    .connect(connectionString, {
      dbName: 'todo_Simon_Aron',
    })
    .then(() => {
      console.log('Connected to MongoDB database ' + mongoose.connection.name)
    })
    .catch((e: string) => {
      console.log(e)
    })
  const port: string = process.env.PORT!
  app.listen(port, () => console.log(port))
}

start()

app.get('/', function (req: typeof request, res: typeof response) {
  res.send('Hey Bro!')
})
