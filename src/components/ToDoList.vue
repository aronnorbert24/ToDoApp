<template>
  <ul v-for="(item, index) in todos" :key="index">
    <li>
      <div class="w-full h-fit mt-12 bg-transparent border-2 border-black rounded-2xl ">
        <div class="flex items-center justify-between w-full h-fit">
          <div class="flex items-center justify-center w-20 h-12 mt-4 ml-6 font-semibold text-[42px] leading-[3.125rem] text-black">
            {{ item.title }}
          </div>
          <div class="flex items-center justify-center mt-4 mr-6 w-28 h-[33.4px] rounded-[500px] text-priority font-semibold text-lg text-center text-white"
          :class="hasPriorityClass(item.priority)"> 
            {{ item.priority }}
          </div>
        </div>
        <div class="flex items-end justify-between w-full h-full mt-10">
          <div class="flex items-center justify-center font-semibold ml-6 mb-4 text-[28px] leading-[2.125rem] height-[2.125rem] text-[#757575]">
            {{ item.description }}
          </div>
          <div class="relative h-10 w-10 mb-4 mr-6 border-[6px] rounded-full"
          :class="hasCheckedColor(item.isChecked)">
            <CheckedIcon v-show="isCheckedVisible(item.isChecked)" class="absolute left-0 bottom-0"/>
          </div>
        </div>
      </div>  
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CheckedIcon from './CheckedIcon.vue'
  import { Todo } from '../todo.ts'

  interface Prop {
    todos: Todo[]
  }

  defineProps<Prop>()

  const priorityClass: Record<string, string> = {
    High: 'bg-[#FF481F]',
    Medium: 'bg-[#FFAB00]',
    Low: 'bg-[#38CBCB]'
  }
  const hasPriorityClass = (priority: string) => priorityClass[priority]
  
  function isCheckedVisible(isChecked: boolean) {
    return isChecked
  }
  function hasCheckedColor(isChecked: boolean) {
    return isChecked ? 'border-green-500' : 'border-black'
  }

</script>
