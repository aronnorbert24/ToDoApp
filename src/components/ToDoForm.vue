<template>
    <button @click.prevent="handleClick">Add</button
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Todo } from '../todo.ts'

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
