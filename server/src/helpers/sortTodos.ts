import { Todo } from '../models/Todo'

let activeOrder = ''

export function sortTodos(todos: Todo[], property: string, order: string) {
  activeOrder = order
  return todos.sort((a: Todo, b: Todo) => {
    switch (property) {
      case 'Title':
        return sortByTitle(a, b)
      case 'Description':
        return sortByDescription(a, b)
      case 'Priority':
        return sortByPriority(a, b)
      case 'Date':
        return sortByDate(a, b)
      default:
        return 0
    }
  })
}

function sortByTitle(a: Todo, b: Todo) {
  const previous = a.title.trim().toLowerCase()
  const next = b.title.trim().toLowerCase()
  if (activeOrder === 'ascending') {
    return previous < next ? -1 : previous > next ? 1 : 0
  }
  return previous < next ? 1 : previous > next ? -1 : 0
}

function sortByDescription(a: Todo, b: Todo) {
  const previous = a.description.trim().toLowerCase()
  const next = b.description.trim().toLowerCase()
  if (activeOrder === 'ascending') {
    return previous < next ? -1 : previous > next ? 1 : 0
  }
  return previous < next ? 1 : previous > next ? -1 : 0
}

function sortByDate(a: Todo, b: Todo) {
  const previous: any = new Date(a.dueDate)
  const next: any = new Date(b.dueDate)
  return activeOrder === 'ascending' ? previous - next : next - previous
}

function sortByPriority(a: Todo, b: Todo) {
  const priorityOrder = ['Low', 'Medium', 'High']
  const previous = priorityOrder.indexOf(a.priority)
  const next = priorityOrder.indexOf(b.priority)
  return activeOrder === 'ascending' ? previous - next : next - previous
}
