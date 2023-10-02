import { Router } from 'express'
import userController from '../controllers/userController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const user = Router()

user.post('/login', ValidateSchema(Schemas.user.login), userController.login)
user.post('/register', ValidateSchema(Schemas.user.register), userController.register)

export default user
