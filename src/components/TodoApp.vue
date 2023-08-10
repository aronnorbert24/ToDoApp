<template>
  <ToDoHeader @showForm="toggleForm" />
  <button v-if="todos.length" @click.prevent="clearToDo" class="float-right bg-red-600 text-white">Clear</button>
  <ToDoForm v-show="isShowingForm" @addToDo="addToDo" @clearToDo="clearToDo" @closeForm="toggleForm" />
  <ToDoList :todos="todos" @deleteToDo="removeToDo" />
</template>

<script setup lang="ts">
import ToDoForm from './ToDoForm.vue'
import ToDoList from './ToDoList.vue'
import ToDoHeader from './ToDoHeader.vue'
import { ref, Ref } from 'vue'
const todos: Ref<string[]> = ref([])
const isShowingForm: Ref<boolean> = ref(false)

function addToDo(todo: string) {
  if (todos.value.includes(todo)) {
    return
  }

  todos.value.push(todo)
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
