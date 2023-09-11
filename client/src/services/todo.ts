import axios from 'axios'
import { Todo } from '../types/todo'

export async function saveTodo(data: Todo) {
  const userId = localStorage.getItem('_id')
  const dueDate = new Date(data.dueDate)
  console.log(data)
  console.log(userId)
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todo/save`, {
      title: data.title,
      description: data.description,
      priority: data.priority,
      isChecked: data.isChecked,
      dueDate: dueDate,
      userId: userId,
    })
    console.log('Outside of axios, but inside of services')
    localStorage.setItem('todoId', response.data._id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getTodos(_id: string) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/todo`, {
      userId: _id,
    })

    localStorage.setItem('todos', response.data.todos)
  } catch (error) {
    console.error(error)
    throw error
  }
}
