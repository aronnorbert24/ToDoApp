import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return res.status(422).json({ error: 'Invalid credentials, please try again' })
    }
  }
}

export const Schemas = {
  user: {
    register: Joi.object<User>({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),

    login: Joi.object<User>({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
}
