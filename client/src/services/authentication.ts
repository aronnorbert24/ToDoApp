import axios from 'axios'
import { setItems } from '../helper/helpers'
import { User } from '../types/user'

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
      email,
      password,
    })
    const firstName = response.data.foundUser.firstName
    const lastName = response.data.foundUser.lastName
    const userId = response.data.foundUser._id
    const token = response.data.accessToken

    setItems(firstName, lastName, userId, token)
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
    }
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
    const firstName = response.data.foundUser.firstName
    const lastName = response.data.foundUser.lastName
    const userId = response.data.foundUser._id
    const token = response.data.accessToken

    setItems(firstName, lastName, userId, token)
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
    }
    return response.data.savedUser
  } catch (error) {
    console.error(error)
    throw error
  }
}
