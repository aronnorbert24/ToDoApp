<template>
  <div @click.prevent="toggleCheck" :class="getCheckedColor(checked)">
    <CheckedIcon v-if="checked" class="absolute bottom-0 left-0 phone:h-6 phone:w-6" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CheckedIcon from './CheckedIcon.vue'

interface Props {
  isChecked: boolean
}

const props = defineProps<Props>()

const checked = ref(props.isChecked)

function getCheckedColor(isChecked: boolean) {
  return isChecked ? 'border-green-500' : 'border-black'
}

function toggleCheck() {
  checked.value = !checked.value
}
</script>
