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
}

export default new TodoService()
