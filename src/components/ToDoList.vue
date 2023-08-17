<template>
  <ul v-for="(item, index) in todos" :key="index">
    <li>
      <div class="phone:flex phone:space-x-4 phone:items-center phone:flex-row-reverse phone:justify-between w-full phone:h-[82px] h-fit mt-8 bg-transparent border-2 border-black rounded-2xl ">
        <div class="flex items-center justify-between w-full h-fit">
          <div class="flex phone:text-left phone:ml-3 items-center justify-between w-9/12 h-12 phone:mt-0 mt-4 ml-6 phone:font-medium font-semibold font-title phone:text-lg text-4xl phone:leading-5 leading-10 text-black">
            {{ item.title }}
          </div>
          <div class="phone:hidden flex items-center justify-center mt-4 mr-6 w-3/12 h-8 rounded-3xl text-priority font-semibold text-lg text-center text-white"
          :class="getPriorityClass(item.priority)"> 
            {{ item.priority }}
          </div>
          <div class="computer:hidden flex items-center justify-center phone:mt-0 mt-4 mr-6 w-2.5 h-2.5 rounded-full text-priority font-semibold text-lg text-center text-white"
          :class="getPriorityClass(item.priority)">
          </div>
        </div>
        <div class="flex phone:items-center items-end justify-between phone:w-6 w-full h-full phone:mt-4 mt-10">
          <div class="phone:hidden flex items-center justify-center phone:w-0 w-9/12 h-9 font-semibold phone: ml-6 mb-6 text-sm text-left leading-2 text-neutral-500">
            {{ item.description }}
          </div>
            <ToDoChecked :isChecked="item.isChecked" class="relative phone:h-6 phone:w-6 h-10 w-10 mb-4 phone:mr-0 mr-6 phone:border-4 border-8 rounded-full hover:cursor-pointer"/>
        </div>
      </div>  
    </li>
  </ul>
</template>

<script setup lang="ts">
  import ToDoChecked from './ToDoChecked.vue'
  import { Todo } from '../todo.ts'

  interface Props {
    todos: Todo[]
  }

  defineProps<Props>()

  const priorityClass: Record<string, string> = {
    High: 'bg-rose-500',
    Medium: 'bg-amber-500',
    Low: 'bg-cyan-400'
  }
  const getPriorityClass = (priority: string) => priorityClass[priority]
</script>
