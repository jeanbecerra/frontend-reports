<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Historial de Llamadas</h1>

    <!-- Filtros -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
      <input type="date" class="border rounded px-3 py-2" v-model="startDate" />
      <input type="date" class="border rounded px-3 py-2" v-model="endDate" />
      <input type="text" placeholder="Buscar por agente o cliente" class="border rounded px-3 py-2" v-model="search" />
      <button @click="cargarCDRs" class="bg-blue-600 text-white px-4 py-2 rounded">
        Filtrar
      </button>
    </div>

    <!-- Mensaje de cargando -->
    <div v-if="loading" class="text-center py-4 text-gray-600">
      Cargando llamadas...
    </div>

    <!-- Tabla de llamadas -->
    <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Usuario</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Origen</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Fecha Inicio</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Fecha Fin</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Destino</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Tipo de llamada</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Duración</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="call in filteredCalls" :key="call.id_call" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm text-gray-700 uppercase">{{ usuario }}</td>
            <td class="px-4 py-2 text-sm text-gray-700 uppercase">{{ call.caller_id }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ formatearFecha(call.call_start) }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ formatearFecha(call.call_end) }}</td>
            <td class="px-4 py-2 text-sm text-gray-700 uppercase">{{ call.called_number }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ call.tariffdesc || 'N/A' }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ calcularDuracion(call.call_start, call.call_end) }}</td>
          </tr>
          <tr v-if="!loading && filteredCalls.length === 0">
            <td colspan="6" class="text-center py-4 text-gray-500">No se encontraron llamadas para este rango.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const usuario = localStorage.getItem("usuario");

const calls = ref([]);
const startDate = ref('');
const endDate = ref('');
const search = ref('');
const loading = ref(false);

// Filtrado por búsqueda (agente o cliente)
const filteredCalls = computed(() => {
  return calls.value.filter(c => 
    (!search.value || (c.tariffdesc && c.tariffdesc.toLowerCase().includes(search.value.toLowerCase())) 
                   || (c.client && c.client.toLowerCase().includes(search.value.toLowerCase())))
  );
});

// Función para calcular duración en formato mm:ss
const calcularDuracion = (inicio, fin) => {
  if (!inicio || !fin) return '00:00';
  const start = new Date(inicio);
  const end = new Date(fin);
  const diff = Math.floor((end - start) / 1000); // segundos
  const minutes = String(Math.floor(diff / 60)).padStart(2, '0');
  const seconds = String(diff % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

// Función para formatear fechas MySQL DATETIME
const formatearFecha = (datetime) => {
  if (!datetime) return '';
  const d = new Date(datetime);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

// Función para cargar CDRs desde el backend (solo al presionar el botón)
const cargarCDRs = async () => {
  if (!startDate.value || !endDate.value) {
    alert('Por favor selecciona un rango de fechas.');
    return;
  }

  loading.value = true;

  const start = startDate.value; // 'YYYY-MM-DD'
  const end = endDate.value + ' 23:59:59'; // incluir todo el día final

  try {
    const url = `http://localhost:3308/api/cdrs/${usuario}?startDate=${start}&endDate=${end}`;
    const response = await fetch(url);
    const data = await response.json();

    // Simular tiempo de carga de 1 segundo
    setTimeout(() => {
      calls.value = data.data || data;
      loading.value = false;
    }, 1000);

  } catch (error) {
    console.error('Error al cargar CDRs:', error);
    setTimeout(() => {
      calls.value = [];
      loading.value = false;
    }, 1000);
  }
};
</script>
