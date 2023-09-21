import { Router } from 'express'
import todoController from '../controllers/todoController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'
import { authenticateToken } from '../middleware/authentication'

const todo = Router()

todo.use(authenticateToken)

todo.get('/:id', todoController.getTodos)
todo.get('/:id/:filterValue', todoController.filterTodos)
todo.post('/save', ValidateSchema(Schemas.todo.create), todoController.saveTodo)
todo.patch('/edit/:id', ValidateSchema(Schemas.todo.update), todoController.editTodo)
todo.delete('/delete/:id', todoController.deleteTodo)

export default todo
