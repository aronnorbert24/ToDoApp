import axios from 'axios'
import { User } from '../types/user'

export async function loginUser(email: string, password: string) {
  try {
    await axios.post('/login', {
      email,
      password,
    })
  } catch (error) {
    console.error(error)
  }
}

export async function registerUser(data: User) {
  try {
    await axios.post('/register-user', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
  } catch (error) {
    console.error(error)
  }
}
