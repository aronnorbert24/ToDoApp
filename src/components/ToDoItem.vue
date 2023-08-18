<template>
  <div @click.self="toggleEditState" class="phone:flex phone:space-x-4 phone:items-center phone:flex-row-reverse phone:justify-between w-full phone:h-[82px] h-fit mt-8 bg-transparent border-2 border-black rounded-2xl"
  :class="getEditFormClass">
        <div class="flex items-center justify-between w-full h-fit">
          <div class="flex phone:text-left phone:ml-3 items-center justify-between w-9/12 h-12 phone:mt-0 mt-4 ml-6 phone:font-medium font-semibold font-title phone:text-lg text-4xl phone:leading-5 leading-10 text-black">
            {{ todo.title }}
          </div>
          <div class="phone:hidden flex items-center justify-center mt-4 mr-6 w-3/12 h-8 rounded-3xl text-priority font-semibold text-lg text-center text-white"
          :class="getPriorityClass(todo.priority)"> 
            {{ todo.priority }}
          </div>
          <div class="computer:hidden flex items-center justify-center phone:mt-0 mt-4 mr-6 w-2.5 h-2.5 rounded-full text-priority font-semibold text-lg text-center text-white"
          :class="getPriorityClass(todo.priority)">
          </div>
        </div>
        <div class="flex phone:items-center items-end justify-between phone:w-6 w-full h-full phone:mt-4 mt-10">
          <div class="phone:hidden flex items-center justify-center phone:w-0 w-9/12 h-9 font-semibold phone: ml-6 mb-6 text-sm text-left leading-2 text-neutral-500">
            {{ todo.description }}
          </div>
            <ToDoChecked :isChecked="todo.isChecked" class="relative phone:h-6 phone:w-6 h-10 w-10 mb-4 phone:mr-0 mr-6 phone:border-4 border-8 rounded-full hover:cursor-pointer"/>
        </div>
      </div>  

  <ToDoForm v-if="isFormEditable" :todo="todo" :index="index" @editToDo="editToDo" @deleteToDo="deleteToDo"/>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import ToDoForm from './ToDoForm.vue'
  import ToDoChecked from './ToDoChecked.vue'
  import { Todo } from '../todo.ts'

  interface Props {
    todo: Todo
    index: number
  }

  defineProps<Props>()

  const emit = defineEmits<{
  (e: 'editToDo', todo: Todo, index: number): void
  (e: 'deleteToDo', index: number): void
 }>()

  const priorityClass: Record<string, string> = {
    High: 'bg-rose-500',
    Medium: 'bg-amber-500',
    Low: 'bg-cyan-400'
  }
  const isFormEditable = ref(false)

  const getPriorityClass = (priority: string) => priorityClass[priority]

  const getEditFormClass = computed(() => {
   return isFormEditable.value ? 'hidden' : 'block'
  })

  function toggleEditState() {
    isFormEditable.value = !isFormEditable.value
  }

  function editToDo(todo: Todo, index: number) {
    toggleEditState()
    emit('editToDo', todo, index)
  }

  function deleteToDo(index: number) {
    toggleEditState()
    emit('deleteToDo', index)
  }
</script>