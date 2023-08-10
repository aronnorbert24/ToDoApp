<template>
  <form>
    <input v-model="todo" type="text" placeholder="Add your To-Do item" class="border-2 border-slate-200 rounded-xl text-center">
    <button @click.prevent="handleClick" >Submit</button>
  </form>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
  const todo = ref("")

  const emit = defineEmits(['addToDo'])

  function handleClick() {
    if (todo.value.length) {
      emit('addToDo', todo.value)
      todo.value = ""
    }
  }
</script>

<style scoped>

</style>