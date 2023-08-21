<template>
  <div @click.self="closeForm" class="h-full">
    <ToDoHeader @showForm="toggleForm" />
    <ToDoForm
      v-if="isShowingForm"
      :index="i"
      :todo="todo"
      @addToDo="addToDo"
      @deleteToDo="toggleForm"
      @closeForm="toggleForm"
      ref="closeFormRef"
    />
    <EmptyListImage v-if="isShowingEmptyImage" class="ml-auto mr-auto" />
    <ToDoList :todos="todos" @editToDo="editToDo" @deleteToDo="removeToDo" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ToDoForm from './ToDoForm.vue'
import ToDoList from './ToDoList.vue'
import ToDoHeader from './ToDoHeader.vue'
import EmptyListImage from './EmptyListImage.vue'
import { Todo } from '../todo.ts'

const todos = ref<Todo[]>(getFromLocalStorage())
const isShowingForm: Ref<boolean> = ref(false)
const isShowingEmptyImage = computed(() => !isShowingForm.value && !todos.value)
let i = -1
const closeFormRef = ref(null)
const todo = ref<Todo>({
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  priority: 'Medium',
  isChecked: false,
  dueDate: new Date(),
})

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function getFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos')
  return savedTodos ? JSON.parse(savedTodos) : []
}

function addToDo(todo: Todo) {
  const newTodo = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    isChecked: todo.isChecked,
    dueDate: todo.dueDate,
  }
  console.log(todos.value)
  todos.value.unshift(newTodo)
  saveToLocalStorage()
  toggleForm()
}

function removeToDo(index: number) {
  if (index > -1) {
    todos.value.splice(index, 1)
  }
  saveToLocalStorage()
}

function editToDo(todo: Todo, index: number) {
  const newTodo = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    isChecked: todo.isChecked,
    dueDate: todo.dueDate,
  }
  i = index
  todos.value[i] = newTodo
  saveToLocalStorage()
}

function toggleForm() {
  isShowingForm.value = !isShowingForm.value
}

function closeForm() {
  isShowingForm.value = false
}

onClickOutside(closeFormRef, toggleForm)
</script>
<style scoped></style>
