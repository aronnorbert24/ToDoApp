<template>
  <div class="h-screen w-screen flex-col bg-gradient-to-br from-cyan-400 to-green-500 pt-10 font-header">
    <div class="ml-auto mr-auto h-1/6 w-1/2 items-center justify-center rounded-3xl bg-yellow-50">
      <p class="pt-8 text-4xl font-semibold leading-10 phone:pt-10 phone:text-xl">Welcome to your To-do App</p>
    </div>
    <div class="h-2/55 m-auto mt-10 justify-center rounded-3xl bg-yellow-50 phone:w-8/12 computer:w-4/12">
      <p class="ml-auto mr-auto w-full pt-4 text-3xl font-semibold">Register</p>

      <UserInput v-model="user.firstName" label="First Name:" property="firstName" />
      <UserInput v-model="user.lastName" label="Last Name:" property="lastName" />
      <UserInput v-model="user.email" label="Email:" property="email" />
      <UserInput v-model="user.password" label="Password:" property="password" />

      <ErrorMessage :error="errorMessage" />

      <button
        class="mt-10 h-10 w-6/12 rounded-3xl border-none bg-gradient-to-br from-cyan-400 to-green-500 font-semibold text-white transition-transform duration-500 ease-in-out hover:scale-110 phone:mt-5"
        @click="register"
      >
        Register
      </button>
      <p class="mt-4 pb-4 font-priority text-sm font-medium">
        You have an <strong>account?</strong> <RouterLink href="#" to="/">Log in here!</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import UserInput from '../components/baseComponents/UserInput.vue'
import ErrorMessage from '../components/baseComponents/ErrorMessage.vue'
import { registerUser } from '../services/authentication'
import { User } from '../types/user'

const user = ref<User>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const errorMessage = ref('')

const router = useRouter()

async function register() {
  if (!isInputValid()) {
    return
  }

  try {
    await registerUser(user.value)
    router.push({ name: 'Dashboard' })
  } catch (error: any) {
    console.error('Register Error', error)
    errorMessage.value = error.response.data
  }
}

function isInputValid() {
  const isAlphabetical = /^[a-zA-Z]+$/
  const isFirstLetterCapital = /^[A-Z].*/

  if (
    user.value.firstName.trim() === '' ||
    user.value.lastName.trim() === '' ||
    user.value.email.trim() === '' ||
    user.value.password.trim() === ''
  ) {
    errorMessage.value = 'Please fill in every field.'
    return false
  }

  if (!isAlphabetical.test(user.value.firstName) || !isAlphabetical.test(user.value.lastName)) {
    errorMessage.value = 'Please enter a valid name'
    return false
  }

  if (!isFirstLetterCapital.test(user.value.firstName) || !isFirstLetterCapital.test(user.value.lastName)) {
    errorMessage.value = 'First and Last names should start with an uppercase letter.'
    return false
  }

  if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(user.value.email)) {
    errorMessage.value = 'Please enter a valid email address'
    return false
  }

  if (user.value.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return false
  }

  return true
}
</script>
