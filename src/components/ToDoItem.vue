<template>
  <div
    @click="toggleEditState"
    class="mt-8 h-fit w-full rounded-2xl border-2 border-black bg-transparent phone:flex phone:h-[82px] phone:flex-row-reverse phone:items-center phone:justify-between phone:space-x-4"
    :class="getEditFormClass"
  >
    <div class="flex h-fit w-full items-center justify-between">
      <div class="items-center justify-between phone:flex phone:flex-col">
        <p
          class="ml-6 mt-4 flex h-12 w-9/12 items-center justify-between font-title text-4xl font-semibold leading-10 text-black phone:ml-3 phone:mt-2 phone:inline phone:h-3 phone:text-left phone:text-2xl phone:font-medium phone:leading-5"
        >
          {{ todo.title }}
        </p>
        <p class="ml-6 flex items-center justify-between text-xs phone:ml-4 phone:mt-2 phone:text-gray-300">
          <DateIcon class="mb-2 mr-1 mt-2 flex items-center" />
          {{ formattedDate }}
        </p>
      </div>
      <div
        class="text-priority mr-6 flex h-8 w-32 items-center justify-center rounded-3xl text-center text-lg font-semibold text-white phone:hidden"
        :class="getPriorityClass(todo.priority)"
      >
        {{ todo.priority }}
      </div>
      <div
        class="text-priority mr-6 mt-4 flex h-2.5 w-2.5 items-center justify-center rounded-full text-center text-lg font-semibold text-white phone:mt-0 phone:inline computer:hidden"
        :class="getPriorityClass(todo.priority)"
      ></div>
    </div>
    <div class="mt-4 flex h-full w-full items-end justify-between phone:mt-4 phone:w-6 phone:items-center">
      <p
        class="leading-2 mb-6 ml-6 flex h-fit w-8/12 items-center justify-between break-all text-left text-lg font-semibold text-neutral-500 phone:hidden phone:w-0"
      >
        {{ todo.description }}
      </p>
      <ToDoChecked
        :isChecked="todo.isChecked"
        @checkToDo="checkToDo($event, todo, index)"
        class="relative mb-4 mr-6 h-10 w-10 rounded-full border-8 hover:cursor-pointer phone:mr-0 phone:h-6 phone:w-6 phone:border-4"
      />
    </div>
  </div>

  <ToDoForm
    v-if="isFormEditable"
    :todo="todo"
    :index="index"
    @editToDo="editToDo"
    @deleteToDo="deleteToDo"
    @toggleEditState="toggleEditState"
    ref="closeFormRef"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ToDoForm from './ToDoForm.vue'
import ToDoChecked from './ToDoChecked.vue'
import DateIcon from './DateIcon.vue'
import { Todo } from '../todo.ts'
import { formatDate } from '../helper/helpers'

interface Props {
  todo: Todo
  index: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'editToDo', todo: Todo, index: number): void
  (e: 'deleteToDo', index: number): void
}>()

const priorityClass: Record<string, string> = {
  High: 'bg-rose-500',
  Medium: 'bg-amber-500',
  Low: 'bg-cyan-400',
}

const isFormEditable = ref(false)
const closeFormRef = ref(null)
const formattedDate = computed(() => {
  return formatDate(props.todo.dueDate, 'item')
})

function getPriorityClass(priority: string) {
  return priorityClass[priority]
}

const getEditFormClass = computed(() => {
  return isFormEditable.value ? 'hidden phone:hidden' : 'block'
})

function toggleEditState() {
  isFormEditable.value = !isFormEditable.value
}

function checkToDo(checked: boolean, updatedToDo: Todo, index: number) {
  props.todo.isChecked = checked
  editToDo(updatedToDo, index)
}

function editToDo(todo: Todo, index: number) {
  toggleEditState()
  emit('editToDo', todo, index)
}

function deleteToDo(index: number) {
  toggleEditState()
  emit('deleteToDo', index)
}

onClickOutside(closeFormRef, toggleEditState)
</script>
