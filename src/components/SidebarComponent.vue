<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  isOpen: Boolean
})

const route = useRoute()
const router = useRouter()

const isActive = (path) => route.path === path

// --------------------------
// MODAL DE CONFIRMACIÓN
// --------------------------
const showLogoutModal = ref(false)

const openLogoutModal = () => showLogoutModal.value = true
const closeLogoutModal = () => showLogoutModal.value = false

const confirmLogout = () => {
  localStorage.removeItem('token')
  showLogoutModal.value = false
  router.replace('/login')
}
</script>

<template>
  <div :class="[
    'min-h-screen overflow-hidden border-r transition-all duration-300',
    isOpen ? 'w-56 bg-white shadow-lg' : 'w-[4.35rem] bg-gray-300'
  ]">

    <!-- TODO EL SIDEBAR -->
    <div class="flex h-screen justify-between  flex-col pt-2 pb-6">
      <ul class="space-y-4 tracking-wide">
        <li>
          <img v-if="isOpen" src="@/assets/logoFravatel.png" class="w-32  mx-auto my-10" alt="">
          <img v-else src="" class="w-32  mx-auto mt-10" alt="">
        </li>
        <li>
          <router-link to="/dashboard" class="mt-4 px-4 py-3 rounded-md transition-colors duration-200 flex" :class="[
            isActive('/dashboard')
              ? 'bg-gradient-to-r from-green-600 to-blue-400 text-white'
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700',
            isOpen ? 'items-center space-x-4' : 'justify-center'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path class="fill-current text-gray-600 group-hover:text-cyan-600"
                d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>

            <span v-if="isOpen">Dashboard</span>
          </router-link>
        </li>


        <!-- Reportes -->
        <li>
          <router-link to="/reportes" class="px-4 py-3 rounded-md transition-colors duration-200 flex" :class="[
            isActive('/reportes')
              ? 'bg-gradient-to-r from-green-600 to-blue-400 text-white'
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700',
            isOpen ? 'items-center space-x-4' : 'justify-center'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path class="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clip-rule="evenodd" />
              <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>

            <span v-if="isOpen">Reportes</span>
          </router-link>
        </li>

      </ul>

      <!-- ======================= -->
      <!-- PARTE INFERIOR: botón cerrar sesión -->
      <!-- ======================= -->
      <button @click="openLogoutModal"
        class="flex gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        <span v-if="isOpen">Cerrar sesión</span>
      </button>

    </div>
  </div>

  <!-- ================================= -->
  <!-- MODAL DE CONFIRMACIÓN DE LOGOUT -->
  <!-- ================================= -->
  <div v-if="showLogoutModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:w-[350px]">
      <h2 class="text-lg font-semibold text-gray-800">¿Estás seguro?</h2>
      <p class="text-gray-600 mt-2">¿Deseas cerrar sesión?</p>

      <div class="flex justify-end gap-3 mt-5">
        <button @click="closeLogoutModal" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700">
          Cancelar
        </button>

        <button @click="confirmLogout" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
          Sí, salir
        </button>
      </div>
    </div>
  </div>
</template>
