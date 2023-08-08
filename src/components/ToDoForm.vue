<template>
    <form>
        <input v-model="todo" type="text">
        <button @click.prevent="emit('addToDo', todo); clearInput()" >Submit</button>
        <button @click.prevent="emit('clearToDo')">Clear</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
    const todo = ref("")

    const emit = defineEmits(['addToDo', 'clearToDo'])

    function clearInput() {
        todo.value = ""
    }
</script>

<style scoped>

</style>