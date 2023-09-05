<template>
  <div class="mt-6 flex justify-between px-2">
    <label :for="property">{{ label }}</label>
    <input :type="property" :name="property" :id="property" class="rounded-lg bg-slate-100 indent-2 outline-black" />
  </div>
</template>

<script setup lang="ts">
  interface Props {
  property: string
  label: string
}

defineProps<Props>()
</script>