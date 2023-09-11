import TodoModel, { Todo } from '../models/Todo'

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
}

export default new TodoService()
