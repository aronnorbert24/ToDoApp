<template>
  <div class="h-screen w-screen flex-col bg-gradient-to-br from-cyan-400 to-green-500 pt-10 font-header">
    <div class="ml-auto mr-auto h-1/6 w-1/2 items-center justify-center rounded-3xl bg-yellow-50">
      <p class="pt-8 text-4xl font-semibold leading-10">Welcome to your To-do App</p>
    </div>
    <div class="m-auto mt-10 h-1/3 justify-center rounded-3xl bg-yellow-50 phone:w-8/12 computer:w-4/12">
      <p class="ml-auto mr-auto w-full pt-4 text-3xl font-semibold">Login</p>

      <UserInput :label="'Email:'" :property="'email'" />
      <UserInput :label="'Password:'" :property="'password'" />
      <button
        class="mt-10 h-10 w-10/12 rounded-3xl border-none bg-gradient-to-br from-cyan-400 to-green-500 font-semibold text-white transition-transform duration-500 ease-in-out hover:scale-110"
        @click="login"
      >
        Login
      </button>
      <p class="mt-12 font-priority text-sm font-medium">
        You don't have an <strong>account?</strong> <RouterLink href="#" to="/register">Sign up</RouterLink> now!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { loginUser } from '../services/authentication'
import UserInput from '../components/baseComponents/UserInput.vue'

const email = ref('')
const password = ref('')

const errorMessage = ref('')

const router = useRouter()

async function login() {
  try {
    await loginUser(email.value, password.value)
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error('Register Error', error)
    errorMessage.value = 'Registration failed. Please check your input and try again.'
  }
}
</script>
