<template>
  <ul v-for="item in todos" :key="item">
    <li>{{ item }}<button @click="emit('deleteToDo', item)">Delete</button></li>
  </ul>
  <EmptyListImage v-if="!todos.length" />
</template>

<script setup lang="ts">
  import EmptyListImage from './EmptyListImage.vue'
  defineProps(['todos'])

const emit = defineEmits(['deleteToDo'])
</script>
