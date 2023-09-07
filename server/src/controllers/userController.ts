import { Request, Response } from 'express'
import userService from '../services/userService'

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const foundUser = await userService.findUserByEmail(email)

      if (!foundUser) {
        return res.sendStatus(409)
      }

      if (password === foundUser.password) {
        res.status(200).json(foundUser)
      } else {
        res.sendStatus(401)
      }
    } catch (error) {
      console.error(error)
      return res.sendStatus(400)
    }
  }
  async register(req: Request, res: Response) {
    try {
      const newUser = req.body
      const duplicateUser = await userService.findUserByEmail(newUser.email)

      if (duplicateUser) {
        return res.sendStatus(400)
      }

      const savedUser = await userService.register(newUser)

      res.json(savedUser)
    } catch (error) {
      console.error(error)
      return res.sendStatus(500)
    }
  }
}

export default new UserController()
