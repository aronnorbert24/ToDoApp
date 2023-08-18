<template>
  <ul v-for="(item, index) in todos" :key="index">
    <li>
      <ToDoItem :todo="item" :index="index" @editToDo="editToDo" @deleteToDo="deleteToDo"/>
    </li>
  </ul>

</template>

<script setup lang="ts">
  import ToDoItem from './ToDoItem.vue'
  import { Todo } from '../todo.ts'

  interface Props {
    todos: Todo[]
  }

  defineProps<Props>()

  const emit = defineEmits<{
  (e: 'editToDo', todo: Todo, index: number): void
  (e: 'deleteToDo', index: number): void
 }>()

  function editToDo(todo: Todo, index: number) {
    emit('editToDo', todo, index)
  }

  function deleteToDo(index: number) {
    emit('deleteToDo', index)
  }
</script>
