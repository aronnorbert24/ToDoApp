<template>
  <transition-group name="todo" tag="ul" class="relative">
    <li v-for="incompleteTodo in incompleteTodos" :key="incompleteTodo.id">
      <ToDoItem :todo="incompleteTodo" @editToDo="editToDo" @deleteToDo="deleteToDo" @toggleCheck="toggleCheck" />
    </li>
  </transition-group>
  <transition-group name="todo" tag="ul" class="relative">
    <li v-for="completeTodo in completeTodos" :key="completeTodo.id">
      <ToDoItem :todo="completeTodo" @editToDo="editToDo" @deleteToDo="deleteToDo" @toggleCheck="toggleCheck" />
    </li>
  </transition-group>
</template>

<script setup lang="ts">
import ToDoItem from './ToDoItem.vue'
import { Todo } from '../todo.ts'

interface Props {
  incompleteTodos: Todo[]
  completeTodos: Todo[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'editToDo', todo: Todo, which: string): void
  (e: 'deleteToDo', index: number, which: string): void
  (e: 'toggleCheck', checked: boolean, index: number): void
}>()

function toggleCheck(checked: boolean, index: number) {
  emit('toggleCheck', checked, index)
}

function editToDo(todo: Todo, which: string) {
  emit('editToDo', todo, which)
}

function deleteToDo(index: number, which: string) {
  emit('deleteToDo', index, which)
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
