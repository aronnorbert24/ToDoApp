<template>
  <div @click.self="closeForm" class="h-full">
    <ToDoHeader @showForm="toggleForm" />
    <ToDoForm v-if="isShowingForm" @addToDo="addToDo" @deleteToDo="toggleForm" @closeForm="toggleForm" />
    <EmptyListImage v-if="isShowingEmptyImage" class="ml-auto mr-auto"/>
    <ToDoList :todos="todos" />
  </div>
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

function removeToDo() {
  const index = todos.value.indexOf(item)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}

function toggleForm() {
  isShowingForm.value = !isShowingForm.value
}

function closeForm() {
  if (isShowingForm.value) {
    isShowingForm.value = !isShowingForm.value
  }
}
</script>
<style scoped></style>
