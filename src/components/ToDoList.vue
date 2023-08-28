<template>
  <transition-group name="todo" tag="ul" class="relative">
    <li v-for="todo in todos" :key="todo.id">
      <ToDoItem :todo="todo" @editToDo="editToDo" @deleteToDo="deleteToDo" @toggleCheck="toggleCheck" />
    </li>
  </transition-group>
</template>

<script setup lang="ts">
import ToDoItem from './ToDoItem.vue'
import { Todo } from '../todo.ts'

interface Props {
  todos: Todo[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'editToDo', todo: Todo, which: string): void
  (e: 'deleteToDo', id: number, which: string): void
  (e: 'toggleCheck', checked: boolean, id: number): void
}>()

function toggleCheck(checked: boolean, id: number) {
  emit('toggleCheck', checked, id)
}

function editToDo(todo: Todo, which: string) {
  emit('editToDo', todo, which)
}

function deleteToDo(id: number, which: string) {
  emit('deleteToDo', id, which)
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
