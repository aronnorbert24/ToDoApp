<template>
  <div class="absolute top-1/4 z-50 m-auto h-fit w-6/12 rounded-2xl border-2 border-black bg-white p-2">
    <p>
      {{ message }}
    </p>
    <div>
      <button @click.prevent="emit('confirm')">Confirm</button>
      <button @click.prevent="emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
const emit = defineEmits(['cancel', 'confirm'])
</script>
