<template>
    <form>
        <input type="text" v-model="todo">
        <button @click.prevent="addToDo">Submit</button>
    </form>
    <ul v-for="item in todos">
        <li>{{ item }}<button>Delete</button></li>
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

</script>

<style scoped>

</style>