<template>
  <div
    class="flex h-16 w-full items-center justify-between rounded-2xl border-2 border-black phone:mt-4 phone:h-12 phone:rounded-lg phone:border-slate-950"
  >
    <SearchIcon class="ml-6 flex items-center justify-center phone:ml-4 phone:h-5 phone:w-5" />
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search todos..."
      class="ml-4 mr-auto flex h-6 w-32 items-center justify-center indent-1 font-header text-lg font-semibold leading-6 text-gray-600 phone:w-20 phone:font-priority phone:text-sm phone:font-medium phone:tracking-tighter phone:text-slate-950"
    />
    <button
      @click="submitSearch"
      class="w-18 mr-6 flex h-8 items-center justify-between rounded-lg bg-black text-center font-header text-sm font-semibold leading-4 text-white phone:mr-4 phone:w-16 phone:pr-14 phone:text-xs phone:leading-3"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchIcon from './SearchIcon.vue'

const emit = defineEmits<{
  (e: 'searchToDos', searchQuery: string): void
}>()

const searchQuery = ref('')

function submitSearch() {
  emit('searchToDos', searchQuery.value)
}
</script>
