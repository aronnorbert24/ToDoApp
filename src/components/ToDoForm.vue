<template>
    <div class="phone:flex phone:space-x-4 phone:items-center phone:flex-row-reverse phone:justify-between w-full phone:h-[82px] h-fit mt-8 bg-transparent border-2 border-black rounded-2xl">
    <div class="flex justify-between items-center">
      <input type="text" class="flex phone:mr-44 items-center justify-center w-8/12 h-12 phone:mt-0 mt-4 phone:ml-0 ml-6 phone:font-medium font-semibold font-title phone:text-lg text-4xl phone:leading-5 leading-10 text-black" placeholder="Title">
      <select class="phone:hidden flex items-center justify-center mt-4 mr-6 w-28 h-8 rounded-3xl text-priority font-semibold text-lg text-center text-white bg-amber-500 border-0">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <textarea type="text" class="flex ml-6 indent-1 text-left mt-4 h-24 font-header font-semibold text-2xl text-black" placeholder="Description"></textarea>
    <div class="flex justify-start items-center mt-6">
      <button @click.prevent="handleClick" class="w-28 h-12 bg-green-400 rounded-2xl font-header font-semibold text-lg text-white leading-6 ml-6 mb-4">Save</button>
      <button @click.prevent class="w-28 h-12 bg-neutral-200 rounded-2xl font-header font-semibold text-lg text-black leading-6 ml-4 mb-4">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Todo } from '../todo.ts'

const emit = defineEmits(['addToDo'])

const todo = ref<Todo>({
  title: 'Title',
  description: 'blahblah',
  priority: 'Medium',
  isChecked: false
})

function handleClick() {
  if (todo.value.title.length) {
    emit('addToDo', todo.value)
  }
}
</script>
