<template>
	<ToDoHeader />
  <ToDoForm @addToDo="addToDo" @clearToDo="clearToDo"/>
  <ToDoList :todos="todos" @deleteToDo="removeToDo" />
</template>

<script setup lang="ts">
  import ToDoForm from './ToDoForm.vue'
  import ToDoList from './ToDoList.vue'
	import ToDoHeader from './ToDoHeader.vue'
  import { ref, Ref } from 'vue';
  const todos: Ref<string[]> = ref([]) 

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

</script>

<style scoped>

</style>