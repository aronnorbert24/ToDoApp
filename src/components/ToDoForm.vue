<template>
    <form>
        <input v-model="todo" type="text">
        <button @click.prevent="handleClick" >Submit</button>
        <button @click.prevent="emit('clearToDo')">Clear</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
    const todo = ref("")

    const emit = defineEmits(['addToDo', 'clearToDo'])

    function handleClick() {
        if (todo.value.length) {
            emit('addToDo', todo.value)
            todo.value = ""
        }
    }
</script>

<style scoped>

</style>