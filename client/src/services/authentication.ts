import axios from 'axios'
import { User } from '../types/user'

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
      email,
      password,
    })

    localStorage.setItem('firstName', response.data.firstName)
    localStorage.setItem('lastName', response.data.lastName)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function registerUser(data: User) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register-user`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
