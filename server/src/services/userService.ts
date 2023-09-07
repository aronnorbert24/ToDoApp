import UserModel, { User } from '../models/User'

class UserService {
  async findUserByEmail(email: string) {
    return UserModel.findOne({ email })
  }

  async register(data: User) {
    const newUser = new UserModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })

    const savedUser = await newUser.save()

    console.log(savedUser)

    return savedUser
  }
}

export default new UserService()
