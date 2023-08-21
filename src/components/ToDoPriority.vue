<template>
<div class="relative w-28 phone:hidden mr-8">
  <div 
        @click="toggleDropdown"
        class="text-priority mr-6 mt-4 flex h-8 w-32 items-center justify-center rounded-3xl text-center text-lg font-semibold phone:hidden"
        :class="[classObject, getPriorityClass(newPriority)]"
      >
        {{ newPriority }}
        <ArrowDown class="ml-4" :class="{ 'stroke-black': isDropdownShowing, 'stroke-white': !isDropdownShowing }" />
  </div>
  <ul v-if="isDropdownShowing" class="absolute w-32 h-fit mt-2 bg-white border-2 border-black rounded-2xl list-none" ref="hideDropdownRef">
    <li v-for="priority in priorityList" :key="priority">
      <p @click="updatePriority(priority)" class="font-priority font-semibold text-lg leading-7 text-left pl-4 rounded-2xl text-black hover:text-white "
      :class="getDropdownClass(priority)">{{ priority }}</p>
    </li>
  </ul>
</div>
<div class="computer:hidden flex items-center justify-center phone:mt-0 mt-4 mr-8 w-2.5 h-2.5 rounded-full text-priority font-semibold text-lg text-center text-white">
  <ul class="flex w-32 h-fit list-none">
    <li v-for="priority in priorityList" :key="priority">
      <div @click="updatePriority(priority)" class="computer:hidden flex items-center justify-center phone:mt-0 mt-4 mr-2 w-2.5 h-2.5 rounded-full text-priority font-semibold text-lg text-center text-white"
        :class="getPriorityClass(priority)">
      </div>
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core';
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
  'border-black': isDropdownShowing.value
 }))

 const dropdownClass: Record<string, string> = {
    High: 'hover:bg-rose-500',
    Medium: 'hover:bg-amber-500',
    Low: 'hover:bg-cyan-400'
  }

 const priorityClass: Record<string, string> = {
    High: 'bg-rose-500',
    Medium: 'bg-amber-500',
    Low: 'bg-cyan-400'
  }

  const getPriorityClass = (priority: string) => {
    return priorityClass[priority]  
  }

  const getDropdownClass = (priority: string) => {
    return dropdownClass[priority]  
  }

  let newPriority = ref(props.priority)
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