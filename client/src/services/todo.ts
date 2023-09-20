import axios from 'axios'
import { Todo } from '../types/todo'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export async function saveTodo(data: Todo) {
  const userId = localStorage.getItem('_id')
  const dueDate = new Date(data.dueDate)
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todo/save`, {
      title: data.title,
      description: data.description,
      priority: data.priority,
      isChecked: data.isChecked,
      dueDate: dueDate,
      userId: userId,
    })
    localStorage.setItem('todoId', response.data._id)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getTodos(_id: string) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/todo/${_id}`)
    localStorage.setItem('todos', JSON.stringify(response.data))

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function editTodo(_id: string, todo: Todo) {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/todo/edit/${_id}`, {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      isChecked: todo.isChecked,
      dueDate: todo.dueDate,
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function deleteTodo(id: string) {
  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/todo/delete/${id}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
