<template>
    <ToDoForm @addToDo="addToDo" @clearToDo="clearToDo"/>
    <ShowToDo :todos="todos" @deleteToDo="removeToDo" />
</template>

<script setup lang="ts">
import ToDoForm from './components/ToDoForm.vue'
import ShowToDo from './components/ShowToDo.vue'
import { ref, Ref } from 'vue';
        const todos: Ref<string[]> = ref([]) 

        function addToDo(todo: string) {
            if (!todo || todos.value.includes(todo)) {
                return
            }

            todos.value.push(todo)
            todo = ""      
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