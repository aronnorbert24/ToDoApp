<template>
  <form>
    <button @click.prevent="handleClick">Add</button>
  </form>
</template>

<script setup lang="ts">
import { Todo } from '../todo.ts'
import { ref } from 'vue'

const emit = defineEmits(['addToDo'])

const todo = ref<Todo>({
  title: 'Title',
  description: 'blahblah',
  priority: 'Medium',
  isChecked: false
})

function handleClick() {
  if (todo.value.title.length) {
    emit('addToDo', todo.value)
  }
}
</script>
