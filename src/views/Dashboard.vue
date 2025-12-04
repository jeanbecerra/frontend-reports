<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Dashboard de Call Center</h1>

    <!-- Grid de métricas -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">

      <!-- Llamadas activas -->
      <div class="bg-blue-500 text-white p-5 rounded-lg shadow flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div class="p-3 bg-white text-blue-500 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h2l3 5-1 2h3l2-2-1-3h3l3 5-2 3h-2" />
          </svg>
        </div>
        <div>
          <p>Llamadas activas</p>
          <p class="text-2xl font-bold">12</p>
        </div>
      </div>

      <!-- Llamadas atendidas -->
      <div class="bg-green-500 text-white p-5 rounded-lg shadow flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div class="p-3 bg-white text-green-500 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p>Llamadas atendidas</p>
          <p class="text-2xl font-bold">345</p>
        </div>
      </div>

      <!-- Llamadas perdidas -->
      <div class="bg-red-500 text-white p-5 rounded-lg shadow flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div class="p-3 bg-white text-red-500 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p>Llamadas perdidas</p>
          <p class="text-2xl font-bold">7</p>
        </div>
      </div>

      <!-- Agentes disponibles -->
      <div class="bg-yellow-500 text-white p-5 rounded-lg shadow flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div class="p-3 bg-white text-yellow-500 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p>Agentes disponibles</p>
          <p class="text-2xl font-bold">8</p>
        </div>
      </div>

    </div>

    <!-- Sección de gráficas o listas (opcional) -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <!-- Ejemplo: Lista de llamadas recientes -->
      <div class="bg-white shadow rounded-lg p-5">
        <h2 class="text-lg font-semibold mb-3">Llamadas recientes</h2>
        <ul class="space-y-2">
          <li class="flex justify-between border-b pb-2">
            <span>Juan Pérez</span>
            <span class="text-gray-500">03:25 min</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span>María Gómez</span>
            <span class="text-gray-500">07:12 min</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span>Carlos Díaz</span>
            <span class="text-gray-500">02:45 min</span>
          </li>
        </ul>
      </div>

      <!-- Ejemplo: Gráfico de llamadas (placeholder) -->
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-center">
        <p class="text-gray-400">Gráfico de llamadas aquí</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
