<script setup>
import { ref, onMounted } from 'vue'
import SidebarComponent from '../components/SidebarComponent.vue'

const usuario = localStorage.getItem("usuario");

const isSidebarOpen = ref(false)


const fechaHora = ref('')

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}


onMounted(() => {
  setInterval(() => {
    const ahora = new Date()
    fechaHora.value = ahora.toLocaleString('es-PE', {
      dateStyle: 'short',
      timeStyle: 'medium'
    })
  }, 1000)
})
</script>


<template>
  <div class="min-h-screen flex bg-gray-100">

    <!-- Sidebar -->
    <SidebarComponent :is-open="isSidebarOpen" />

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="h-16 bg-white shadow flex items-center justify-between px-6">
        <button @click="toggleSidebar" class="p-2 rounded hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-align-left" _ngcontent-lkh-c11="">
            <line x1="17" y1="10" x2="3" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="17" y1="18" x2="3" y2="18"></line>
          </svg>
        </button>
        <div class="flex space-x-4">
          <div class="flex items-center space-x-2">
            <p class="text-gray-700">{{ fechaHora }}</p>
          </div>
          <div class="border-r border-gray-300 h-6 mx-4"></div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-green-500 rounded-full relative top-px"></div>
            <span class="text-gray-900">Service</span>
          </div>
          <div class="border-r border-gray-300 h-6 mx-4"></div>
          <p class="uppercase"><strong>{{ usuario }}</strong></p>
        </div>

      </header>

      <!-- Main -->
      <main class="flex-1 p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
