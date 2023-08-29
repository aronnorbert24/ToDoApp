<template>
  <div class="mt-6 h-8 w-full computer:flex computer:items-center computer:justify-between">
    <div class="flex h-8 w-7/12 items-center justify-center phone:w-full computer:ml-5">
      <button
        v-for="button in buttons"
        :key="button"
        class="px-15 border-px ml-4 flex h-8 w-32 items-center justify-center rounded-lg font-header text-sm font-semibold leading-4 transition-transform duration-300 ease-in-out hover:scale-110 hover:border-black hover:bg-black hover:text-white phone:ml-0 phone:mr-auto phone:w-fit phone:px-3"
        :class="[
          activeSort === button && isSortActive === true
            ? ['border-green-400', 'bg-green-400', 'text-white']
            : ['border-black', 'bg-white', 'text-black'],
        ]"
        @click="toggleActiveSort(button, sortOrder)"
      >
        {{ button }}
      </button>
    </div>
    <div class="flex h-8 w-5/12 items-center phone:mb-6 phone:mt-6 computer:ml-auto">
      <div
        class="border-px flex h-8 w-9 items-center justify-center rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer computer:ml-auto computer:mr-3"
        :class="getSortClass('ascending')"
        @click="toggleSortOrder('ascending')"
      >
        <ArrowUp class="ml-auto mr-auto" />
      </div>
      <div
        class="border-px flex h-8 w-9 items-center justify-center rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer phone:ml-2"
        :class="getSortClass('descending')"
        @click="toggleSortOrder('descending')"
      >
        <ArrowDown class="ml-auto mr-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrowUp from './SortArrowUp.vue'
import ArrowDown from './SortArrowDown.vue'

const emit = defineEmits<{
  (e: 'sortTodos', property: string, order: string, isActive: boolean): void
  (e: 'disactivateSort', isActive: boolean): void
}>()

const buttons: string[] = ['Title', 'Description', 'Priority', 'Date']
const isSortActive = ref(false)
const activeSort = ref('')
const sortOrder = ref('ascending')
const isAscendingActive = ref(true)

function toggleActiveSort(priority: string, order: string) {
  if (activeSort.value !== priority && !isSortActive.value) {
    activeSort.value = priority
    isSortActive.value = !isSortActive.value
  } else if (activeSort.value !== priority) {
    activeSort.value = priority
  } else {
    isSortActive.value = !isSortActive.value
  }
  sortOrder.value = order
  isSortActive.value
    ? emit('sortTodos', activeSort.value, sortOrder.value, isSortActive.value)
    : emit('disactivateSort', isSortActive.value)
}

function toggleSortOrder(order: string) {
  order !== sortOrder.value ? (isAscendingActive.value = !isAscendingActive.value) : ''
  sortOrder.value = order
  isSortActive.value && activeSort.value.length
    ? emit('sortTodos', activeSort.value, sortOrder.value, isSortActive.value)
    : ''
}

function getSortClass(order: string) {
  if (order === 'ascending') {
    return isAscendingActive.value ? ['border-green-400', 'bg-green-400'] : ['border-black', 'bg-black']
  }
  return isAscendingActive.value ? ['border-black', 'bg-black'] : ['border-green-400', 'bg-green-400']
}
</script>
