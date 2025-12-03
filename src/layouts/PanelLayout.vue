<script setup>
import { ref } from 'vue'
import SidebarComponent from '../components/SidebarComponent.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>


<template>
  <div class="min-h-screen flex bg-gray-100">

    <!-- Sidebar -->
    <SidebarComponent :is-open="isSidebarOpen" />

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="h-16 bg-white shadow flex items-center px-6">
        <button @click="toggleSidebar" class="p-2 rounded hover:bg-gray-200">
          <!-- icono hamburguesa -->
          ☰
        </button>
      </header>

      <!-- Main -->
      <main class="flex-1 p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>


