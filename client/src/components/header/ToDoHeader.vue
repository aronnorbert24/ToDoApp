<template>
  <div class="mb-7 flex w-full items-center justify-between font-header phone:mb-3">
    <p
      class="w-36 text-left font-priority text-2xl font-medium leading-7 text-black phone:w-20 phone:text-sm phone:leading-4"
    >
      Welcome Aron Simon
    </p>
    <RouterLink
      class="ml-auto h-[52px] w-[120px] rounded-2xl border-0 bg-neutral-200 pt-3 text-center leading-8 text-black transition-transform duration-300 ease-in-out hover:scale-110 phone:hidden"
      href="#"
      to="/"
    >
      Log Out
    </RouterLink>
    <button @click.prevent class="w-[66px] border-0 bg-transparent computer:hidden">
      <LogOutIcon />
    </button>
  </div>
  <div class="mb-4 border-2 border-neutral-200 phone:border"></div>
  <div class="flex w-full items-center justify-between font-header">
    <p
      class="non-italic lg:text-7xl h-20 w-72 text-left text-5xl font-semibold tracking-tighter text-black phone:h-[26px] phone:w-[100px] phone:text-2xl phone:leading-7"
    >
      To do list
    </p>
    <div
      @click="emit('showForm')"
      class="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-none bg-transparent outline-none transition-transform duration-300 ease-in-out hover:scale-110 phone:h-8 phone:w-8 computer:mb-9"
    >
      <PlusIcon class="phone:h-10 phone:w-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PlusIcon from './PlusIcon.vue'
import LogOutIcon from './LogOutIcon.vue'

const emit = defineEmits(['showForm'])
</script>
