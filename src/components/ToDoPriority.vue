<template>
  <div class="mr-8 w-28 phone:hidden" :class="popupClass">
    <div
      @click="toggleDropdown"
      class="text-priority mr-6 mt-4 flex h-8 w-32 items-center justify-center rounded-3xl text-center text-lg font-semibold phone:hidden"
      :class="[classObject, getPriorityClass(newPriority)]"
    >
      {{ newPriority }}
      <ArrowDown class="ml-4" :class="arrowClass" />
    </div>
    <ul
      v-if="isDropdownShowing"
      class="absolute mt-2 h-fit w-32 list-none rounded-2xl border-2 border-black bg-white"
      ref="hideDropdownRef"
    >
      <li v-for="priority in priorityList" :key="priority">
        <p
          @click="updatePriority(priority)"
          class="rounded-2xl pl-4 text-left font-priority text-lg font-semibold leading-7 text-black hover:text-white"
          :class="getDropdownClass(priority)"
        >
          {{ priority }}
        </p>
      </li>
    </ul>
  </div>
  <div
    class="text-priority mr-8 mt-4 flex h-2.5 w-2.5 items-center justify-center rounded-full text-center text-lg font-semibold text-white phone:mt-0 computer:hidden"
  >
    <ul class="flex h-fit w-32 list-none">
      <li v-for="priority in priorityList" :key="priority">
        <div
          @click="updatePriority(priority)"
          class="text-priority mr-2 mt-4 flex h-2.5 w-2.5 items-center justify-center rounded-full text-center text-lg font-semibold text-white phone:mt-0 computer:hidden"
          :class="getPriorityClass(priority)"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ArrowDown from './ArrowDown.vue'

interface Props {
  priority: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateNewPriority', priority: string): void
  (e: 'getFadeoutClass', isDropdownShowing: boolean): void
}>()

const isDropdownShowing = ref(false)
const hideDropdownRef = ref(null)
const classObject = computed(() => ({
  'text-white': !isDropdownShowing.value,
  'border-0': !isDropdownShowing.value,
  'text-black': isDropdownShowing.value,
  'bg-white': isDropdownShowing.value,
  'border-2': isDropdownShowing.value,
  'border-black': isDropdownShowing.value,
}))

const popupClass = computed(() => ({
  relative: isDropdownShowing.value,
  static: !isDropdownShowing.value,
}))

const arrowClass = computed(() => ({
  'stroke-white': !isDropdownShowing.value,
  'stroke-black': isDropdownShowing.value,
}))

const dropdownClass: Record<string, string> = {
  High: 'hover:bg-rose-500',
  Medium: 'hover:bg-amber-500',
  Low: 'hover:bg-cyan-400',
}

const priorityClass: Record<string, string> = {
  High: 'bg-rose-500',
  Medium: 'bg-amber-500',
  Low: 'bg-cyan-400',
}

function getPriorityClass(priority: string) {
  return priorityClass[priority]
}

function getDropdownClass(priority: string) {
  return dropdownClass[priority]
}

const newPriority = ref(props.priority)
const priorityList = ['Low', 'Medium', 'High']

function updatePriority(priority: string) {
  newPriority.value = priority
  getPriorityClass(priority)
  getDropdownClass(priority)
  emit('updateNewPriority', priority)
  toggleDropdown()
}

function toggleDropdown() {
  isDropdownShowing.value = !isDropdownShowing.value

  emit('getFadeoutClass', isDropdownShowing.value)
}

onClickOutside(hideDropdownRef, toggleDropdown)
</script>
