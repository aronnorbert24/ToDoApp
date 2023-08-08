<template>
    <form>
        <input type="text" v-model="todo">
        <button @click.prevent="addToDo">Submit</button>
        <button @click="todos= []">Clear</button>
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
            if (todo.value) {
                if (!todos.value.includes(todo.value)) {
                    todos.value.push(todo.value)
                }
                todo.value = ""
            }
        }

        function removeToDo(item: string) {
            let index: number = todos.value.indexOf(item)
            if (index > -1) {
                todos.value.splice(index, 1)
            }
        }

</script>

<style scoped>

</style>