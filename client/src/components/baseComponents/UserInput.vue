<template>
  <div class="ml-auto mr-auto mt-6 flex justify-between px-40 phone:w-fit phone:px-4">
    <label :for="property">{{ label }}</label>
    <input
      v-model="value"
      :type="property"
      :name="property"
      :id="property"
      class="rounded-lg bg-slate-100 indent-2 outline-black phone:w-7/12"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  property: string
  label: string
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
})
</script>
