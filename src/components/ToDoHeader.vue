<template>
  <div class="t-0 flex w-full items-center justify-between font-header">
    <div class="flex items-center justify-center">
      <p
        class="left-105 top-20.5 non-italic mt-3 h-20 w-72 text-left text-3xl font-semibold tracking-tighter text-black md:text-5xl lg:text-7xl"
      >
        To do list
      </p>
    </div>
    <div
      @click="emit('showForm')"
      class="left-72 mb-8 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-none bg-transparent outline-none transition-transform duration-300 ease-in-out hover:scale-110"
    >
      <PlusIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from './PlusIcon.vue'

const emit = defineEmits(['showForm'])
</script>
