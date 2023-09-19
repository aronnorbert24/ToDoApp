import axios from 'axios'
import { User } from '../types/user'

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
      email,
      password,
    })

    localStorage.setItem('firstName', response.data.foundUser.firstName)
    localStorage.setItem('lastName', response.data.foundUser.lastName)
    localStorage.setItem('_id', response.data.foundUser._id)
    localStorage.setItem('token', response.data.accessToken)
    return response.data.foundUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function registerUser(data: User) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    localStorage.setItem('firstName', response.data.savedUser.firstName)
    localStorage.setItem('lastName', response.data.savedUser.lastName)
    localStorage.setItem('_id', response.data.savedUser._id)
    localStorage.setItem('token', response.data.accessToken)
    return response.data.savedUser
  } catch (error) {
    console.error(error)
    throw error
  }
}
