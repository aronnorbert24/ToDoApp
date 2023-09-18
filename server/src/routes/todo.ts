import { Router } from 'express'
import todoController from '../controllers/todoController'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema'

const todo = Router()

todo.get('/:id', todoController.getTodos)
todo.post('/save', ValidateSchema(Schemas.todo.create), todoController.saveTodo)
todo.patch('/edit/:id', ValidateSchema(Schemas.todo.update), todoController.editTodo)
todo.delete('/delete/:id', todoController.deleteTodo)

export default todo
