import UserModel, { User } from '../models/User'
import TodoModel from '../models/Todo'

class UserService {
  async findUserByEmail(email: string) {
    return UserModel.findOne({ email })
  }

  async getTodosById(_id: string) {
    const todos = await TodoModel.find({ userId: _id }).sort({ isChecked: 1 }).exec()
    return todos
  }

  async register(data: User) {
    const newUser = new UserModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })

    const savedUser = await newUser.save()

    return savedUser
  }
}

export default new UserService()
