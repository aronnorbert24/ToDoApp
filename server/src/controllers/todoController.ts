import { Request, Response } from 'express'
import todoService from '../services/todoService'
import userService from '../services/userService'

class TodoController {
  async saveTodo(req: Request, res: Response) {
    try {
      console.log('In Controller')
      const newTodo = req.body

      const savedTodo = await todoService.saveTodo(newTodo)
      return res.status(201).json(savedTodo)
    } catch (error) {
      return res.status(500).send('Saving Todo failed. Please check your input, and try again.')
    }
  }

  async getTodos(req: Request, res: Response) {
    try {
      const userId = req.params._id
      console.log(req.params._id)

      const posts = await userService.getPostsById(userId)
      return res.status(200).json(posts)
    } catch (error) {
      return res.status(500).send('Unable to get todos at this time. Please try again.')
    }
  }
}

export default new TodoController()
