<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Historial de Llamadas</h1>

    <!-- Filtros (opcional) -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
      <input type="date" class="border rounded px-3 py-2" />
      <input type="text" placeholder="Buscar por agente o cliente" class="border rounded px-3 py-2" />
    </div>

    <!-- Tabla de llamadas -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Fecha</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Agente</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Cliente</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Duración</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Estado</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="call in calls" :key="call.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm text-gray-700">{{ call.date }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ call.agent }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ call.client }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ call.duration }}</td>
            <td class="px-4 py-2 text-sm">
              <span 
                :class="{
                  'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs': call.status === 'Atendida',
                  'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs': call.status === 'Perdida',
                  'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs': call.status === 'En curso'
                }"
              >
                {{ call.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Ejemplo de datos de llamadas
const calls = ref([
  { id: 1, date: '2025-12-03 09:15', agent: 'Juan Pérez', client: 'Empresa A', duration: '03:25', status: 'Atendida' },
  { id: 2, date: '2025-12-03 09:50', agent: 'María Gómez', client: 'Empresa B', duration: '07:12', status: 'Perdida' },
  { id: 3, date: '2025-12-03 10:05', agent: 'Carlos Díaz', client: 'Empresa C', duration: '02:45', status: 'En curso' },
  { id: 4, date: '2025-12-03 10:30', agent: 'Ana Ruiz', client: 'Empresa D', duration: '05:10', status: 'Atendida' },
])
</script>


