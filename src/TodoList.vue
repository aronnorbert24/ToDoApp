<template>
    <form>
        <input type="text" v-model="todo">
        <button @click.prevent="addToDo">Submit</button>
        <button @click="todos= []">Clear</button>
    </form>
    <ul v-for="item in todos">
        <li>{{ item }}<button @click="removeToDo(item)">Delete</button></li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
        const todo: string = ref("")
        const todos: string[] = ref([]) 

        function addToDo() {
            if (todo.value) {
                if (!todos.value.includes(todo.value)) {
                    todos.value.push(todo.value)
                }
                todo.value = ""
            }
        }

        function removeToDo(item) {
            let index: number = todos.value.indexOf(item)
            if (index > -1) {
                todos.value.splice(index, 1)
            }
        }

</script>

<style scoped>

</style>