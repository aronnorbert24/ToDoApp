import UserModel, { User } from '../models/User'

class UserService {
  async findUserByEmail(email: string) {
    return UserModel.findOne({ email })
  }

  async getPostsById(_id: string) {
    return UserModel.findById({ _id }).populate('posts')
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
