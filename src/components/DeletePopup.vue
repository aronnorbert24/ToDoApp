<template>
  <div class="absolute z-50 m-auto w-9/12 h-fit top-1/4 left-12 p-2  bg-white border-2 border-black rounded-2xl">
    <div>
      <p>Are you sure you want to delete this item? This operation is permanent and you will not be able to undo this action.</p>
    </div>
    <div class="">
      <button @click.prevent="deleteToDo">Delete</button>
      <button @click.prevent="cancelDelete">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['cancelDelete', 'deleteToDo'])

  function deleteToDo() {
    emit('deleteToDo')
  }

  function cancelDelete() {
    emit('cancelDelete')
  }
</script>