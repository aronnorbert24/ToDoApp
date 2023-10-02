import TodoModel, { Todo, Archive } from '../models/Todo'
import { sortTodos } from '../helpers/sortTodos'

class TodoService {
  async saveTodo(data: Todo) {
    const newTodo = new TodoModel({
      title: data.title,
      description: data.description,
      priority: data.priority,
      isChecked: data.isChecked,
      dueDate: data.dueDate,
      userId: data.userId,
    })

    const savedTodo = await newTodo.save()

    return savedTodo
  }

  async getTodosById(_id: string) {
    const todos = await TodoModel.find({ userId: _id }).sort({ isChecked: 1 }).exec()
    return todos
  }

  async findTodoById(todoId: string) {
    const todo = await TodoModel.findById(todoId).exec()
    return todo
  }

  async updateTodoById(todoId: string, newTodo: Todo) {
    await TodoModel.findByIdAndUpdate(todoId, newTodo)
    const updatedTodo = this.findTodoById(todoId)
    return updatedTodo
  }

  async deleteTodoById(todoId: string) {
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId)
    if (deletedTodo) {
      const archivedTodo = new Archive({
        title: deletedTodo.title,
        description: deletedTodo.description,
        priority: deletedTodo.priority,
        isChecked: deletedTodo.isChecked,
        dueDate: deletedTodo.dueDate,
        userId: deletedTodo.userId,
      })
      await archivedTodo.save()
    }
  }

  async filterTodos(userId: string, filter: string) {
    const todos = await this.getTodosById(userId)
    return todos.filter((todo: Todo) => {
      const filterSmall = filter.toLowerCase()
      const titleSmall = todo.title.toLowerCase()
      const descSmall = todo.description.toLowerCase()
      return titleSmall.includes(filterSmall) || descSmall.includes(filterSmall)
    })
  }

  async sortTodos(userId: string, sortProperty: string, sortOrder: string) {
    const todos = await this.getTodosById(userId)
    const sortedTodos = sortTodos(todos, sortProperty, sortOrder)
    return sortedTodos
  }
}

export default new TodoService()
