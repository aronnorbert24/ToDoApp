import { config } from 'dotenv'

config({
  path: '../.env',
})

const asd = (abc: string) => {
  throw new Error(abc)
}

export default {
  database: process.env.DB_NAME || asd('database name is missing'),
  connectionString: process.env.CONNECTION_STRING || asd('connection string is missing'),
  port: process.env.PORT || asd('port number is missing'),
}
