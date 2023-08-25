<template>
  <div class="flex h-8 w-full items-center justify-between">
    <div class="ml-5 flex h-8 w-7/12 items-center justify-center">
      <button
        v-for="button in buttons"
        :key="button"
        class="px-15 border-px ml-4 flex h-8 w-32 items-center justify-center rounded-lg font-header text-sm font-semibold leading-4 transition-transform duration-300 ease-in-out hover:scale-110 hover:border-black hover:bg-black hover:text-white"
        :class="activeSortClass"
        @click="toggleActiveSort"
      >
        {{ button }}
      </button>
    </div>
    <div class="ml-auto flex h-8 w-5/12 items-center justify-between">
      <div
        class="border-px ml-auto mr-3 flex h-8 w-9 items-center justify-between rounded-lg border-green-400 bg-green-400"
      >
        <ArrowUp class="ml-auto mr-auto" />
      </div>
      <div class="border-px flex h-8 w-9 items-center justify-center rounded-lg border-black bg-black">
        <ArrowDown class="ml-auto mr-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrowUp from './SortArrowUp.vue'
import ArrowDown from './SortArrowDown.vue'

const buttons: string[] = ['Title', 'Description', 'Priority', 'Date']
const isSortActive = ref(false)

function toggleActiveSort() {
  isSortActive.value = !isSortActive.value
}

function activeSortClass() {
  return isSortActive.value
    ? ['border-green-400', 'bg-green-400', 'text-white']
    : ['border-black', 'bg-white', 'text-black']
}
</script>
