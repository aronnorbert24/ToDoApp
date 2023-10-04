<template>
  <div class="absolute top-1/4 z-50 m-auto h-fit w-6/12 rounded-2xl border-2 border-black bg-white p-2">
    <h2 class="mb-6 font-header text-3xl font-semibold leading-9">The following todos are due today:</h2>
    <ul v-for="(todo, index) in todos" :key="index">
      <li class="font-header text-lg font-semibold text-red-600">
        {{ todo }}
      </li>
    </ul>
    <div>
      <button class="mt-4" @click.prevent="emit('cancel')">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  todos: string[]
}

defineProps<Props>()
const emit = defineEmits(['cancel'])
</script>
