<template>
  <div class="t-0 phone:mb-3 mb-7 flex w-full items-center justify-between font-header">
    <p class="text-black phone:text-sm text-2xl text-left font-medium phone:leading-[17px] leading-[29px] font-priority phone:w-20 w-36">Welcome Aron Simon</p>
    <button class="phone:hidden w-[120px] h-[52px] bg-[#E6E6E6] rounded-2xl ml-auto text-center">Log Out</button>
    <button @click.prevent class="computer:hidden bg-transparent w-[66px]">
      <LogOutIcon />
    </button>
  </div>
  <div class="phone:border-[1px] border-2 border-[#E5E5E5] mb-4"></div>
  <div class="t-0 flex w-full items-center justify-between font-header">
    <div class="flex items-center justify-center">
      <p
        class="non-italic phone:h-[26px] phone:w-[100px] h-20 w-72 text-left phone:text-2xl phone:leading-[29px] text-5xl font-semibold tracking-tighter text-black lg:text-7xl"
      >
        To do list
      </p>
    </div>
    <div
      @click="emit('showForm')"
      class="left-72 computer:mb-9 flex phone:h-8 phone:w-8 h-16 w-16 cursor-pointer items-center justify-center rounded-full border-none bg-transparent outline-none transition-transform duration-300 ease-in-out hover:scale-110"
    >
      <PlusIcon class="phone:h-10 phone:w-10"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from './PlusIcon.vue'
import LogOutIcon from './LogOutIcon.vue'

const emit = defineEmits(['showForm'])
</script>
