<template>
  <div @click.self="closeForm" class="h-full">
    <ToDoHeader @showForm="toggleForm" />
    <ToDoForm v-if="isShowingForm" :index="i" :todo="todo" @addToDo="addToDo" @deleteToDo="toggleForm" @closeForm="toggleForm" />
    <EmptyListImage v-if="isShowingEmptyImage" class="ml-auto mr-auto"/>
    <ToDoList :todos="todos" @editToDo="editToDo" @deleteToDo="removeToDo"/>
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
let i = -1
const todo = ref<Todo>({
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur atque labore id quod suscipit perferendis mollitia veniam tempore inventore.',
  priority: 'Medium',
  isChecked: false,
})

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

function removeToDo(index: number) {
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}

function editToDo(todo: Todo, index: number) {
  const newTodo = ref<Todo>({
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    isChecked: todo.isChecked
  })
  i = index
  todos[i] = newTodo

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
