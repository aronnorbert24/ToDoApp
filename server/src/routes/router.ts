import { Router } from 'express'
import userController from '../controllers/userController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const router = Router()

router.post('/login', ValidateSchema(Schemas.user.login), userController.login)
router.post('/register-user', ValidateSchema(Schemas.user.register), userController.register)

export default router
