import { Request, Response } from 'express'
import userService from '../services/userService'

import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const foundUser = await userService.findUserByEmail(email)

      if (!foundUser) {
        return res.status(409).send('Incorrect email, please try again.')
      }

      if (compareSync(password, foundUser.password)) {
        res.status(200).json(foundUser)
      } else {
        res.status(401).send('Incorrect password, please try again')
      }
    } catch (error) {
      console.error(error)
      return res.status(500).send('Registration failed. Please check your input, and try again.')
    }
  }
  async register(req: Request, res: Response) {
    try {
      const newUser = req.body
      const duplicateUser = await userService.findUserByEmail(newUser.email)

      // check if the email has been used before
      if (duplicateUser) {
        return res.status(400).send('A user with that email already exists.')
      } else {
        // hash user password
        const salt = genSaltSync(10)
        newUser.password = hashSync(newUser.password, salt)
        // save data to the database
        const savedUser = await userService.register(newUser)

        res.json(savedUser)
      }
    } catch (error) {
      console.error(error)
      return res.status(500).send('Login failed. Please check your input and try again.')
    }
  }
}

export default new UserController()
