<template>
  <ToDoHeader @showForm="toggleForm" />
  <ToDoForm v-if="isShowingForm" @addToDo="addToDo" @clearToDo="clearToDo" @closeForm="toggleForm" />
  <EmptyListImage v-if="isShowingEmptyImage" class="ml-auto mr-auto"/>
  <ToDoList :todos="todos" @deleteToDo="removeToDo" />
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import ToDoForm from './ToDoForm.vue'
import ToDoList from './ToDoList.vue'
import ToDoHeader from './ToDoHeader.vue'
import EmptyListImage from './EmptyListImage.vue'
import { Todo } from '../todo.ts'

const todos = ref<Todo[]>([])
const isShowingForm: Ref<boolean> = ref(false)
const isShowingEmptyImage = computed(() => !isShowingForm.value && !todos.value.length)

function addToDo(todo: Todo) {
  const newTodo = {
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    isChecked: todo.isChecked
  };
  todos.value.unshift(newTodo)
  toggleForm()
}

function removeToDo(item: string) {
  const index = todos.value.indexOf(item)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}

function clearToDo() {
  todos.value = []
}

function toggleForm() {
  isShowingForm.value = !isShowingForm.value
}
</script>
<style scoped></style>
