<template>
    <form>
        <input v-model="todo" type="text">
        <button @click.prevent="addToDo">Submit</button>
        <button @click="clearToDo">Clear</button>
    </form>
    <ul v-for="item in todos" :key="item">
        <li>{{ item }}<button @click="removeToDo(item)">Delete</button></li>
    </ul>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
        const todo = ref("")
        const todos: Ref<string[]> = ref([]) 

        function addToDo() {
            if (!todo.value || todos.value.includes(todo.value)) {
                return
            }

            todos.value.push(todo.value)
            todo.value = ""                
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