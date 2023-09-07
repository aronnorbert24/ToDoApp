<template>
  <transition-group name="todo" tag="ul" class="relative phone:top-16">
    <li v-for="todo in todos" :key="todo._id">
      <ToDoItem :todo="todo" @editToDo="editToDo" @deleteToDo="deleteToDo" @toggleCheck="toggleCheck" />
    </li>
  </transition-group>
</template>

<script setup lang="ts">
import ToDoItem from './ToDoItem.vue'
import { Todo } from '../../types/todo.ts'

interface Props {
  todos: Todo[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'editToDo', todo: Todo): void
  (e: 'deleteToDo', id: number): void
  (e: 'toggleCheck', isChecked: boolean, id: number): void
}>()

function toggleCheck(isChecked: boolean, id: number) {
  emit('toggleCheck', isChecked, id)
}

function editToDo(todo: Todo) {
  emit('editToDo', todo)
}

function deleteToDo(id: number) {
  emit('deleteToDo', id)
}
</script>

<style scoped>
.todo-enter-active,
.todo-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}

.todo-enter-to,
.todo-leave-from {
  opacity: 1;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0;
}

.todo-move {
  transition: all 0.5s ease;
}
</style>
