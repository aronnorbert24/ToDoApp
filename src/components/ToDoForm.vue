<template>
  <div
    class="mt-8 h-fit w-full rounded-2xl border-2 border-black bg-transparent"
  >
    <div class="flex items-center justify-between">
      <input
        type="text"
        class="phone:h-6 phone:w-48 phone:text-lg phone:ml-4 indent-0.5 ml-6 mt-4 flex h-12 w-8/12 items-center justify-center font-title text-4xl font-semibold leading-10 text-black"
        :placeholder="updatedToDo.title"
        v-model="updatedToDo.title"
      />
      <ToDoPriority :priority="todo.priority" @updateNewPriority="updateNewPriority"/>
    </div>
    <textarea
      type="text"
      class="phone:w-56 phone:h-20 phone:ml-4 phone:font-normal phone:text-sm phone:leading-4 phone:text-neutral-500 ml-6 mt-4 flex h-24 text-left indent-1 font-header text-2xl font-semibold text-black"
      :placeholder="updatedToDo.description"
      v-model="updatedToDo.description"
    ></textarea>
    <div class="mt-6 flex items-center justify-start">
      <button
        @click.prevent="saveTodo"
        class="phone:w-16 phone:h-8 phone:ml-4 phone:py-1.5 phone:px-3 phone:rounded-lg phone:text-sm phone:leading-4 mb-4 ml-6 h-12 w-28 rounded-2xl bg-green-400 font-header text-lg font-semibold leading-6 text-white"
      >
        Save
      </button>
      <button
        @click.prevent="deleteToDo"
        class="phone:w-16 phone:ml-4 phone:py-1.5 phone:px-3 phone:h-8 phone:rounded-lg phone:text-sm phone:leading-4 mb-4 ml-4 h-12 w-28 rounded-2xl bg-neutral-200 font-header text-lg font-semibold leading-6 text-black"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToDoPriority from './ToDoPriority.vue'
import { Todo } from '../todo.ts'

interface Props {
    todo: Todo
    index: number
  }

const props = defineProps<Props>()

const emit = defineEmits(['addToDo', 'deleteToDo', 'editToDo'] )

const updatedToDo = ref(props.todo)

function updateNewPriority(priority: string) {
  updatedToDo.value.priority = priority
}

function saveTodo() {
  if (!updatedToDo.value.title.length) {
    return
  }

  if (props.index === -1) {
    emit('addToDo', updatedToDo.value)
    defaultToDo()
    return
  }
  emit('editToDo', updatedToDo.value, props.index)
}

function defaultToDo() {
  updatedToDo.value.title = 'Title',
  updatedToDo.value.description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur atque labore id quod suscipit perferendis mollitia veniam tempore inventore.',
  updatedToDo.value.priority = 'Medium'
}

function deleteToDo() {
  emit('deleteToDo', props.index)
}
</script>
