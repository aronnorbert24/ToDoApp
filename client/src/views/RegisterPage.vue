<template>
  <div class="h-screen w-screen flex-col bg-gradient-to-br from-cyan-400 to-green-500 pt-10 font-header">
    <div class="ml-auto mr-auto h-1/6 w-1/2 items-center justify-center rounded-3xl bg-yellow-50">
      <p class="pt-8 text-4xl font-semibold leading-10">Welcome to your To-do App</p>
    </div>
    <div class="h-2/55 m-auto mt-10 justify-center rounded-3xl bg-yellow-50 phone:w-8/12 computer:w-4/12">
      <p class="ml-auto mr-auto w-full pt-4 text-3xl font-semibold">Register</p>

      <UserInput :label="'First Name:'" :property="'firstName'" v-model="user.firstName" />
      <UserInput :label="'Last Name:'" :property="'lastName'" v-model="user.lastName" />
      <UserInput :label="'Email:'" :property="'email'" v-model="user.email" />
      <UserInput :label="'Password:'" :property="'password'" v-model="user.password" />

      <button
        class="mt-10 h-10 w-10/12 rounded-3xl border-none bg-gradient-to-br from-cyan-400 to-green-500 font-semibold text-white transition-transform duration-500 ease-in-out hover:scale-110"
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
import { registerUser, loginUser } from '../services/authentication'
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
  try {
    await registerUser(user.value)
  } catch (error) {
    console.error('Register Error', error)
    errorMessage.value = 'Registration failed. Please check your input and try again.'
  }

  await loginUser(user.value.email, user.value.password)
  router.push({ name: 'Dashboard' })
}
</script>
