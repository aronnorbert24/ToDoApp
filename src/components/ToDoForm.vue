<template>
  <div
    @click.self="toggleEditState"
    class="relative z-0 mt-8 h-fit w-full rounded-2xl border-2 border-black bg-transparent"
  >
    <div
      v-if="isDropdownShowing || isDeletePopupVisible"
      class="absolute h-full w-full bg-black opacity-50 phone:hidden"
    ></div>
    <div class="flex items-center justify-between">
      <input
        type="text"
        class="ml-6 mt-4 flex h-12 w-8/12 items-center justify-center indent-0.5 font-title text-4xl font-semibold leading-10 text-black phone:ml-4 phone:h-6 phone:w-48 phone:text-lg"
        :placeholder="updatedToDo.title"
        v-model="updatedToDo.title"
      />
      <ToDoPriority
        :priority="todo.priority"
        @updateNewPriority="updateNewPriority"
        @getFadeoutClass="setDropdownVisibility"
      />
    </div>
    <div>
      <input
        type="date"
        name="dueDate"
        id="dueDate"
        :placeholder="toDoDate"
        min="2023-08-20"
        max="2025-12-31"
        v-model="toDoDate"
        class="ml-6 flex flex-row-reverse phone:ml-4"
      />
    </div>
    <textarea
      type="text"
      class="ml-6 mt-6 flex h-24 w-10/12 text-left indent-1 font-header text-2xl font-semibold text-black phone:ml-4 phone:h-20 phone:w-56 phone:text-sm phone:font-normal phone:leading-4 phone:text-neutral-500"
      :placeholder="updatedToDo.description"
      v-model="updatedToDo.description"
    ></textarea>
    <div class="flex items-center justify-start">
      <button
        @click.prevent="saveTodo"
        class="mb-4 ml-6 h-12 w-28 rounded-2xl bg-green-400 font-header text-lg font-semibold leading-6 text-white phone:ml-4 phone:h-8 phone:w-16 phone:rounded-lg phone:px-3 phone:py-1.5 phone:text-sm phone:leading-4"
      >
        Save
      </button>
      <button
        @click.prevent="toggleDeletePopup"
        class="mb-4 ml-4 h-12 w-28 rounded-2xl bg-neutral-200 font-header text-lg font-semibold leading-6 text-black phone:ml-4 phone:h-8 phone:w-16 phone:rounded-lg phone:px-3 phone:py-1.5 phone:text-sm phone:leading-4"
      >
        Delete
      </button>
    </div>
    <DeletePopup
      v-if="isDeletePopupVisible"
      @deleteToDo="deleteToDo"
      @cancelDelete="toggleDeletePopup"
      ref="hideDeletePopupRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ToDoPriority from './ToDoPriority.vue'
import DeletePopup from './DeletePopup.vue'
import { Todo } from '../todo.ts'

interface Props {
  todo: Todo
  index: number
}

const props = defineProps<Props>()

const emit = defineEmits(['addToDo', 'deleteToDo', 'editToDo', 'toggleEditState'])

const updatedToDo = ref<Todo>({
  title: props.todo.title,
  description: props.todo.description,
  priority: props.todo.priority,
  isChecked: props.todo.isChecked,
  dueDate: props.todo.dueDate,
})

const isDropdownShowing = ref(false)
const isDeletePopupVisible = ref(false)
const hideDeletePopupRef = ref(null)
const toDoDate = ref('2023-08-20')

function updateNewPriority(priority: string) {
  updatedToDo.value.priority = priority
}

function setDropdownVisibility(isShowing: boolean) {
  isDropdownShowing.value = isShowing
}

function toggleDeletePopup() {
  isDeletePopupVisible.value = !isDeletePopupVisible.value
}

function toggleEditState() {
  emit('toggleEditState')
}

function saveTodo() {
  updatedToDo.value.dueDate = new Date(toDoDate.value)
  if (!updatedToDo.value.title.length) {
    return
  }

  if (props.index === -1) {
    emit('addToDo', updatedToDo.value)
    return
  }
  emit('editToDo', updatedToDo.value, props.index)
}

function deleteToDo() {
  emit('deleteToDo', props.index)
}

onClickOutside(hideDeletePopupRef, toggleDeletePopup)
</script>
