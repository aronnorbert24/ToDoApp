import { Request, Response } from 'express'
import todoService from '../services/todoService'

class TodoController {
  async saveTodo(req: Request, res: Response) {
    try {
      const newTodo = req.body

      const savedTodo = await todoService.saveTodo(newTodo)
      return res.status(201).json(savedTodo)
    } catch (error) {
      return res.status(500).send('Saving Todo failed. Please check your input, and try again.')
    }
  }

  async getTodos(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const sortProperty = req.query.sortProperty as string
      const sortOrder = req.query.sortOrder as string
      const filter = req.query.filter as string

      if (!userId) {
        return res.status(400).send('Invalid userId was provided.')
      }

      if (sortOrder && sortProperty) {
        const todos = await todoService.sortTodos(userId, sortProperty, sortOrder, filter)
        return res.status(200).json(todos)
      }

      if (filter) {
        const todos = await todoService.filterTodos(userId, filter)
        return res.status(200).json(todos)
      }

      const todos = await todoService.getTodosById(userId)
      return res.status(200).json(todos)
    } catch (error) {
      return res.status(500).send('Unable to get todos at this time. Please try again.')
    }
  }

  async editTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.id
      const newTodo = req.body

      if (!todoId) {
        return res.status(400).send('Invalid todo id provided.')
      }

      const updatedTodo = await todoService.updateTodoById(todoId, newTodo)

      return res.status(200).json(updatedTodo)
    } catch (error) {
      return res.status(500).send('Unable to update the todo. Please check your input and try again later.')
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.id

      await todoService.deleteTodoById(todoId)
      return res.status(200).send('Todo successfully deleted')
    } catch (error) {
      return res.status(500).send('Unable to get todos at this time. Please try again.')
    }
  }
}

export default new TodoController()
