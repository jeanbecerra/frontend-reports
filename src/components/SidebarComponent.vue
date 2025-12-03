<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  isOpen: Boolean
})

const route = useRoute()

const isActive = (path) => route.path === path
</script>

<template>
  <div :class="[
    'min-h-screen overflow-hidden border-r transition-all duration-300',
    isOpen ? 'w-56 bg-white shadow-lg' : 'w-[3.35rem] bg-gray-100'
  ]">
    <div class="flex h-screen flex-col justify-between pt-2 pb-6">
      <!-- Logo -->
      <div class="w-max ml-10 mt-5">
        <img v-if="isOpen" src="@/assets/logoFravatel.png" class="w-32" alt="">
      </div>

      <!-- Menú -->
      <ul class="mt-6 space-y-2 tracking-wide">
        <li>
          <router-link to="/dashboard"
            class="flex items-center space-x-4 px-4 py-3 rounded-md transition-colors duration-200"
            :class="isActive('/dashboard') ? 'bg-gradient-to-r from-green-600 to-blue-400 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path class="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clip-rule="evenodd" />
              <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
            <span v-if="isOpen">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/home"
            class="flex items-center space-x-4 px-4 py-3 rounded-md transition-colors duration-200"
            :class="isActive('/home') ? 'bg-gradient-to-r from-green-600 to-blue-400 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700'">
            <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                class="fill-current text-cyan-400 dark:fill-slate-600"></path>
              <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                class="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
              <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                class="fill-current group-hover:text-sky-300"></path>
            </svg>
            <span v-if="isOpen">Home</span>
          </router-link>
        </li>
        <!-- Agrega más enlaces aquí -->
      </ul>
    </div>
  </div>
</template>
