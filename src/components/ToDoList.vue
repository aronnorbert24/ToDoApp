<template>
  <ul v-for="(item, index) in todos" :key="index">
    <li>
      <div class="phone:flex phone:space-x-4 phone:items-center phone:flex-row-reverse phone:justify-between w-full phone:h-[82px] h-fit mt-8 bg-transparent border-2 border-black rounded-2xl ">
        <div class="flex items-center justify-between w-full h-fit">
          <div class="flex phone:mr-[168px] items-center justify-center w-20 h-12 phone:mt-0 mt-4 phone:ml-0 ml-6 phone:font-medium font-semibold font-title phone:text-lg text-[42px] phone:leading-[21px] leading-[3.125rem] text-black">
            {{ item.title }}
          </div>
          <div class="phone:hidden flex items-center justify-center mt-4 mr-6 w-28 h-[33.4px] rounded-[500px] text-priority font-semibold text-lg text-center text-white"
          :class="hasPriorityClass(item.priority)"> 
            {{ item.priority }}
          </div>
          <div class="computer:hidden flex items-center justify-center phone:mt-0 mt-4 mr-6 w-2.5 h-2.5 rounded-[500px] text-priority font-semibold text-lg text-center text-white"
          :class="hasPriorityClass(item.priority)">
          </div>
        </div>
        <div class="flex phone:items-center items-end justify-between w-full h-full phone:mt-4 mt-10">
          <div class="phone:hidden flex items-center justify-center font-semibold ml-6 mb-4 text-[28px] leading-[2.125rem] height-[2.125rem] text-[#757575]">
            {{ item.description }}
          </div>
          <div class="relative phone:h-6 phone:w-6 h-10 w-10 mb-4 phone:mr-0 mr-6 phone:border-[3px] border-[6px] rounded-full"
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
