import TodoModel, { Todo, Archive } from '../models/Todo'

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
    const archivedTodo = await TodoModel.findByIdAndDelete(todoId)
    if (archivedTodo) {
      const newTodo = new Archive({
        title: archivedTodo.title,
        description: archivedTodo.description,
        priority: archivedTodo.priority,
        isChecked: archivedTodo.isChecked,
        dueDate: archivedTodo.dueDate,
        userId: archivedTodo.userId,
      })
      await newTodo.save()
    }
  }
}

export default new TodoService()
