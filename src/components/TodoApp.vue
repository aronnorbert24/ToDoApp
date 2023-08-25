<template>
  <div @click.self="closeForm" class="h-full">
    <ToDoHeader @showForm="toggleForm" />
    <ToDoForm
      v-if="isShowingForm"
      :id="i"
      :todo="todo"
      @addToDo="addToDo"
      @deleteToDo="toggleForm"
      @closeForm="toggleForm"
      ref="closeFormRef"
    />
    <EmptyListImage v-if="isShowingEmptyImage" class="ml-auto mr-auto" />
    <ToDoList
      :incompleteTodos="incompleteTodos"
      :completeTodos="completeTodos"
      @editToDo="editToDo"
      @deleteToDo="removeToDo"
      @toggleCheck="toggleCheck"
    />
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

const incompleteTodos = ref<Todo[]>(getIncompletedFromLocalStorage())
const completeTodos = ref<Todo[]>(getCompletedFromLocalStorage())
const isShowingForm: Ref<boolean> = ref(false)
const isShowingEmptyImage = computed(
  () => !isShowingForm.value && !incompleteTodos.value.length && !completeTodos.value.length
)
const closeFormRef = ref(null)
const i = -1
const todo = ref<Todo>({
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  priority: 'Medium',
  isChecked: false,
  dueDate: new Date(),
  id: -1,
})

function saveToLocalStorage() {
  localStorage.setItem('incompleteTodos', JSON.stringify(incompleteTodos.value))
  localStorage.setItem('completeTodos', JSON.stringify(completeTodos.value))
}

function getIncompletedFromLocalStorage() {
  const savedIncompleteTodos = localStorage.getItem('incompleteTodos')
  return savedIncompleteTodos ? JSON.parse(savedIncompleteTodos) : []
}

function getCompletedFromLocalStorage() {
  const savedCompleteTodos = localStorage.getItem('completeTodos')
  return savedCompleteTodos ? JSON.parse(savedCompleteTodos) : []
}

function toggleCheck(checked: boolean, id: number) {
  if (checked) {
    const updatedTodo = incompleteTodos.value.find((todo) => todo.id === id)
    if (updatedTodo) {
      updatedTodo.isChecked = checked
    }
    animateDown(id)
  } else {
    const updatedTodo = completeTodos.value.find((todo) => todo.id === id)
    if (updatedTodo) {
      updatedTodo.isChecked = checked
    }
    animateUp(id)
  }
}

function animateDown(id: number) {
  const index = incompleteTodos.value.findIndex((todo) => todo.id === id)
  const copyToDo = incompleteTodos.value.splice(index, 1)
  if (!copyToDo[0]) {
    return
  }

  completeTodos.value.push(copyToDo[0])
  saveToLocalStorage()
}

function animateUp(id: number) {
  const index = completeTodos.value.findIndex((todo) => todo.id === id)
  const copyToDo = completeTodos.value.splice(index, 1)
  if (!copyToDo[0]) {
    return
  }
  incompleteTodos.value.unshift(copyToDo[0])
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
  incompleteTodos.value.unshift(newTodo)
  saveToLocalStorage()
  toggleForm()
}

function removeToDo(id: number, which: string) {
  if (which === 'complete') {
    completeTodos.value = completeTodos.value.filter((todo) => todo.id !== id)
  } else {
    incompleteTodos.value = incompleteTodos.value.filter((todo) => todo.id !== id)
  }
  saveToLocalStorage()
}

function editToDo(todo: Todo, which: string) {
  const newTodo = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    isChecked: todo.isChecked,
    dueDate: todo.dueDate,
    id: todo.id,
  }
  if (which === 'complete') {
    const index: number = completeTodos.value.findIndex((todo) => todo.id === newTodo.id)
    completeTodos.value[index] = newTodo
  } else {
    const index: number = incompleteTodos.value.findIndex((todo) => todo.id === newTodo.id)
    incompleteTodos.value[index] = newTodo
  }

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
