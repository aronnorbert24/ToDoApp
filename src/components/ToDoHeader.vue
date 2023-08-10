<template>
  <div class="flex justify-between items-center font-header t-0 w-full">
    <div class="flex justify-center items-center ">
      <p class="w-72 h-20 left-105 top-20.5 non-italic font-semibold text-3xl md:text-5xl lg:text-7xl text-black tracking-tighter text-left mt-3">To do list</p>
    </div>
    <div @click="emit('show')" class="h-16 w-16 mb-8 rounded-full outline-none border-none left-72 bg-transparent flex justify-center items-center hover:scale-110 transition-transform ease-in-out duration-300 cursor-pointer">
        <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <circle cx="30.1828" cy="30.1043" r="29.8221" fill="#38CB89"/>
          <path d="M29.3607 20.2608H31.0013C31.1472 20.2608 31.2201 20.3337 31.2201 20.4795V39.7295C31.2201 39.8754 31.1472 39.9483 31.0013 39.9483H29.3607C29.2149 39.9483 29.142 39.8754 29.142 39.7295V20.4795C29.142 20.3337 29.2149 20.2608 29.3607 20.2608Z" fill="white"/>
          <path d="M20.9935 29.0655H39.3685C39.5144 29.0655 39.5873 29.1384 39.5873 29.2842V30.9248C39.5873 31.0707 39.5144 31.1436 39.3685 31.1436H20.9935C20.8477 31.1436 20.7748 31.0707 20.7748 30.9248V29.2842C20.7748 29.1384 20.8477 29.0655 20.9935 29.0655Z" fill="white"/>
        </svg>
    </div>
  </div>
</template>

<script setup lang="ts">


  const emit = defineEmits(['show']) 
</script>