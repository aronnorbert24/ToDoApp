<template>
    <ul v-for="item in todos" :key="item">
        <li>{{ item }}<button @click="emit('deleteToDo', item)">Delete</button></li>
    </ul>
</template>

<script setup lang="ts">
    defineProps(['todos'])

    const emit = defineEmits(['deleteToDo'])
</script>
