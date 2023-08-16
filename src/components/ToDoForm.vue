<template>
  <div
    class="mt-8 h-fit w-full rounded-2xl border-2 border-black bg-transparent phone:flex phone:h-[82px] phone:flex-row-reverse phone:items-center phone:justify-between phone:space-x-4"
  >
    <div class="flex items-center justify-between">
      <input
        type="text"
        class="ml-6 mt-4 flex h-12 w-8/12 items-center justify-center font-title text-4xl font-semibold leading-10 text-black phone:ml-0 phone:mr-44 phone:mt-0 phone:text-lg phone:font-medium phone:leading-5"
        :placeholder="todo.title"
        v-model="todo.title"
      />
      <select
        class="text-priority mr-6 mt-4 flex h-8 w-28 items-center justify-center rounded-3xl border-0 bg-amber-500 text-center text-lg font-semibold text-white phone:hidden"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <textarea
      type="text"
      class="ml-6 mt-4 flex h-24 text-left indent-1 font-header text-2xl font-semibold text-black"
      :placeholder="todo.description"
      v-model="todo.description"
    ></textarea>
    <div class="mt-6 flex items-center justify-start">
      <button
        @click.prevent="saveTodo"
        class="mb-4 ml-6 h-12 w-28 rounded-2xl bg-green-400 font-header text-lg font-semibold leading-6 text-white"
      >
        Save
      </button>
      <button
        @click.prevent
        class="mb-4 ml-4 h-12 w-28 rounded-2xl bg-neutral-200 font-header text-lg font-semibold leading-6 text-black"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Todo } from '../todo.ts'

const emit = defineEmits(['addToDo'])

const todo = ref<Todo>({
  title: 'Title',
  description: 'Description',
  priority: 'Medium',
  isChecked: false,
})

function saveTodo() {
  if (!todo.value.title.length) {
    return
  }
  emit('addToDo', todo.value)
}
</script>
