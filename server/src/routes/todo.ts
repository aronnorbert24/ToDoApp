import { Router } from 'express'
import todoController from '../controllers/todoController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'
import { authenticateToken } from '../middleware/authentication'

const todo = Router()

todo.get('/:id', authenticateToken, todoController.getTodos)
todo.post('/save', authenticateToken, ValidateSchema(Schemas.todo.create), todoController.saveTodo)
todo.patch('/edit/:id', authenticateToken, ValidateSchema(Schemas.todo.update), todoController.editTodo)
todo.delete('/delete/:id', authenticateToken, todoController.deleteTodo)

export default todo
