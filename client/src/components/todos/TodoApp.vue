<template>
  <ToDoHeader @showForm="toggleForm" />
  <ToDoSearch v-if="filteredTodos.length || searchQuery.length" @searchToDos="searchToDos" />
  <p v-if="!filteredTodos.length && searchQuery.length" class="mt-6 font-header text-xl font-semibold text-black">
    There are no todos with that title/description
  </p>
  <ToDoSort v-if="filteredTodos.length" @sortTodos="sortTodos" @disactivateSort="disactivateSort" />
  <ToDoForm
    v-if="isFormShown"
    :todo="todo"
    @addToDo="addToDo"
    @deleteToDo="toggleForm"
    @closeForm="toggleForm"
    ref="closeFormRef"
  />
  <EmptyListImage v-if="isEmptyImageVisible" class="ml-auto mr-auto" />
  <ToDoList :todos="filteredTodos" @editToDo="editToDo" @deleteToDo="removeToDo" @toggleCheck="toggleCheck" />
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ToDoForm from './ToDoForm.vue'
import ToDoList from './ToDoList.vue'
import ToDoHeader from '../header/ToDoHeader.vue'
import ToDoSearch from '../header/ToDoSearch.vue'
import ToDoSort from '../header/ToDoSort.vue'
import EmptyListImage from '../icons/EmptyListImage.vue'
import { Todo } from '../../types/todo'

const isFormShown: Ref<boolean> = ref(false)
const isEmptyImageVisible = computed(() => !isFormShown.value && !todos.value.length)
const closeFormRef = ref(null)
const searchQuery = ref('')
const activeOrder = ref('')
const activeProperty = ref('')
const isSortActive = ref(false)
const todos = ref<Todo[]>(getFromLocalStorage())
const todo = ref<Todo>({
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  priority: 'Medium',
  isChecked: false,
  dueDate: new Date(),
  id: -1,
})

const filteredTodos = computed(() => {
  if (!searchQuery.value) {
    return todos.value
  }
  return todos.value.filter((todo) => {
    const searchSmall = searchQuery.value.toLowerCase()
    const titleSmall = todo.title.toLowerCase()
    const descSmall = todo.description.toLowerCase()
    return titleSmall.includes(searchSmall) || descSmall.includes(searchSmall)
  })
})

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function getFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos')
  return savedTodos ? JSON.parse(savedTodos) : []
}

function toggleCheck(isChecked: boolean, id: number) {
  const updatedTodo = todos.value.find((todo) => todo.id === id)
  if (updatedTodo) {
    updatedTodo.isChecked = isChecked
  }
  if (!isSortActive.value) {
    animate(id, isChecked)
  }
}

function animate(id: number, isChecked: boolean) {
  const index = todos.value.findIndex((todo) => todo.id === id)
  const copyToDo = todos.value.splice(index, 1)
  if (!copyToDo[0]) {
    return
  }
  isChecked ? todos.value.push(copyToDo[0]) : todos.value.unshift(copyToDo[0])
  saveToLocalStorage()
}

function addToDo(todo: Todo) {
  const newTodo = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    isChecked: todo.isChecked,
    dueDate: todo.dueDate,
    id: new Date().getTime(),
  }
  todos.value.unshift(newTodo)
  saveToLocalStorage()
  if (isSortActive.value) {
    sortTodos(activeProperty.value, activeOrder.value, isSortActive.value)
  }
  toggleForm()
}

function removeToDo(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id)
  saveToLocalStorage()
}

function editToDo(todo: Todo) {
  const newTodo = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    isChecked: todo.isChecked,
    dueDate: todo.dueDate,
    id: todo.id,
  }
  const index: number = todos.value.findIndex((todo) => todo.id === newTodo.id)
  todos.value[index] = newTodo
  saveToLocalStorage()
  if (isSortActive.value) {
    sortTodos(activeProperty.value, activeOrder.value, isSortActive.value)
  }
}

function toggleForm() {
  isFormShown.value = !isFormShown.value
}

function searchToDos(item: string) {
  searchQuery.value = item
}

function disactivateSort(isActive: boolean) {
  isSortActive.value = isActive
}

function sortTodos(property: string, order: string, isActive: boolean) {
  activeOrder.value = order
  activeProperty.value = property
  isSortActive.value = isActive
  todos.value.sort((a: Todo, b: Todo) => {
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
  if (activeOrder.value === 'ascending') {
    return previous < next ? -1 : previous > next ? 1 : 0
  }
  return previous < next ? 1 : previous > next ? -1 : 0
}

function sortByDescription(a: Todo, b: Todo) {
  const previous = a.description.trim().toLowerCase()
  const next = b.description.trim().toLowerCase()
  if (activeOrder.value === 'ascending') {
    return previous < next ? -1 : previous > next ? 1 : 0
  }
  return previous < next ? 1 : previous > next ? -1 : 0
}

function sortByDate(a: Todo, b: Todo) {
  const previous = new Date(a.dueDate)
  const next = new Date(b.dueDate)
  return activeOrder.value === 'ascending' ? previous - next : next - previous
}

function sortByPriority(a: Todo, b: Todo) {
  const priorityOrder = ['Low', 'Medium', 'High']
  const previous = priorityOrder.indexOf(a.priority)
  const next = priorityOrder.indexOf(b.priority)
  return activeOrder.value === 'ascending' ? previous - next : next - previous
}

onClickOutside(closeFormRef, toggleForm)
</script>
<style scoped></style>
