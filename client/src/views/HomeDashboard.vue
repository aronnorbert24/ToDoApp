<template>
  <div v-if="isLogoutPopupVisible" class="absolute z-10 h-full w-full bg-black opacity-50 phone:hidden"></div>
  <div class="z-0 ml-auto mr-auto h-screen w-screen computer:w-4/12">
    <ToDoHeader @showForm="toggleForm" @logout="toggleLogoutPopup" />
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
  </div>
  <ConfirmPopup
    v-if="isLogoutPopupVisible"
    :message="logoutMessage"
    class="left-32"
    @confirm="logoutUser"
    @cancel="toggleLogoutPopup"
  />
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ToDoForm from '../components/todos/ToDoForm.vue'
import ToDoList from '../components/todos/ToDoList.vue'
import ToDoHeader from '../components/header/ToDoHeader.vue'
import ToDoSearch from '../components/header/ToDoSearch.vue'
import ToDoSort from '../components/header/ToDoSort.vue'
import ConfirmPopup from '../components/todos/ConfirmPopup.vue'
import EmptyListImage from '../components/icons/EmptyListImage.vue'
import { saveTodo, getTodos, editTodo, deleteTodo, filterTodos, todoSort } from '../services/todo'
import { Todo } from '../types/todo'

const isFormShown: Ref<boolean> = ref(false)
const isEmptyImageVisible = computed(() => !isFormShown.value && !todos.value.length)
const closeFormRef = ref(null)
const searchQuery = ref('')
const activeOrder = ref('')
const activeProperty = ref('')
const isSortActive = ref(false)
const isLogoutPopupVisible = ref(false)
const logoutMessage = 'Are you sure you want to logout?'
const userId = localStorage.getItem('_id')!
const todos = ref<Todo[]>([])
const todo = ref<Todo>({
  _id: '',
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  priority: 'Medium',
  isChecked: false,
  dueDate: new Date(),
})

const filteredTodos = ref<Todo[]>([])

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

async function getFromLocalStorage() {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/'
      return []
    }
    const newTodos = await getTodos(userId)
    todos.value = newTodos
    filteredTodos.value = newTodos
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function toggleCheck(isChecked: boolean, id: string) {
  const updatedTodo = todos.value.find((todo) => todo._id === id)
  if (updatedTodo) {
    updatedTodo.isChecked = isChecked
    await editTodo(id, updatedTodo)
  }
  if (!isSortActive.value) {
    animate(id, isChecked)
  }
}

function animate(id: string, isChecked: boolean) {
  const index = todos.value.findIndex((todo) => todo._id === id)
  const copyToDo = todos.value.splice(index, 1)
  if (!copyToDo[0]) {
    return
  }
  isChecked ? todos.value.push(copyToDo[0]) : todos.value.unshift(copyToDo[0])
  saveToLocalStorage()
}

async function addToDo(todo: Todo) {
  try {
    await saveTodo(todo)
    const todoId = localStorage.getItem('todoId')!
    const newTodo = {
      _id: todoId,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      isChecked: todo.isChecked,
      dueDate: todo.dueDate,
    }
    todos.value.unshift(newTodo)
    saveToLocalStorage()
    if (isSortActive.value) {
      sortTodos(activeProperty.value, activeOrder.value, isSortActive.value)
    }
    toggleForm()
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function removeToDo(id: string) {
  await deleteTodo(id)
  todos.value = todos.value.filter((todo) => todo._id !== id)
  saveToLocalStorage()
}

async function editToDo(todo: Todo) {
  const newTodo = await editTodo(todo._id, todo)
  const index = todos.value.findIndex((todo) => todo._id === newTodo._id)
  todos.value[index] = newTodo
  saveToLocalStorage()
  if (isSortActive.value) {
    sortTodos(activeProperty.value, activeOrder.value, isSortActive.value)
  }
}

function toggleForm() {
  isFormShown.value = !isFormShown.value
}

async function searchToDos(item: string) {
  searchQuery.value = item
  filteredTodos.value = !searchQuery.value.length
    ? (filteredTodos.value = todos.value)
    : await filterTodos(userId, searchQuery.value)
}

function disactivateSort(isActive: boolean) {
  isSortActive.value = isActive
}

async function sortTodos(property: string, order: string, isActive: boolean) {
  activeOrder.value = order
  activeProperty.value = property
  isSortActive.value = isActive
  filteredTodos.value = await todoSort(userId, property, order)
  todos.value = filteredTodos.value
}

function logoutUser() {
  localStorage.clear()
  window.location.href = '/'
}

function toggleLogoutPopup() {
  isLogoutPopupVisible.value = !isLogoutPopupVisible.value
}

onClickOutside(closeFormRef, toggleForm)

onMounted(async () => {
  await getFromLocalStorage()
})
</script>
<style scoped></style>
