<template>
  <div class="absolute left-12 top-1/4 z-50 m-auto h-fit w-9/12 rounded-2xl border-2 border-black bg-white p-2">
    <p>
      Are you sure you want to delete this item? This operation is permanent and you will not be able to undo this
      action.
    </p>
    <div>
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
