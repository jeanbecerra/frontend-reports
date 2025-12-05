<script setup>
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const usuario = localStorage.getItem("usuario");

// DATA PRINCIPAL
const calls = ref([]);
const startDate = ref('');
const endDate = ref('');
const search = ref('');
const loading = ref(false);

// PAGINACIÓN
const page = ref(1);
const limit = ref(17);
const totalPages = ref(1);
const total = ref(0);

// FILTRO SOLO DE LA PÁGINA ACTUAL
const filteredCalls = computed(() => {
    return calls.value.filter(c =>
        !search.value ||
        (c.tariffdesc && c.tariffdesc.toLowerCase().includes(search.value.toLowerCase())) ||
        (c.called_number && c.called_number.toLowerCase().includes(search.value.toLowerCase()))
    );
});

// DURACIÓN
const calcularDuracion = (inicio, fin) => {
    if (!inicio || !fin) return '00:00';

    const diff = Math.floor((new Date(fin) - new Date(inicio)) / 1000);
    const min = String(Math.floor(diff / 60)).padStart(2, '0');
    const sec = String(diff % 60).padStart(2, '0');

    return `${min}:${sec}`;
};

// FORMATEAR FECHA
const formatearFecha = (datetime) => {
    if (!datetime) return '';

    const d = new Date(datetime);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} `
        + `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
};

// CARGAR PAGINADO
const cargarCDRs = async (goToPage = 1) => {
    if (!startDate.value || !endDate.value) {
        alert('Por favor selecciona un rango de fechas.');
        return;
    }

    loading.value = true;
    page.value = goToPage;

    try {
        const url = `http://localhost:3308/api/cdrs/${usuario}?startDate=${startDate.value}&endDate=${endDate.value}&page=${page.value}&limit=${limit.value}`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("Error en el servidor");

        const data = await response.json();

        calls.value = data.data || [];
        total.value = data.total ?? data.count ?? 0;
        totalPages.value = data.totalPages ?? Math.ceil(total.value / limit.value);
    } catch (e) {
        console.error(e);
        calls.value = [];
        total.value = 0;
        totalPages.value = 1;
    }

    loading.value = false;
};

// EXPORTAR EXCEL (TODOS LOS REGISTROS)
const exportarExcel = async () => {
    if (!startDate.value || !endDate.value) {
        return alert('Selecciona un rango de fechas');
    }

    try {
        const url = `http://localhost:3308/api/cdrs-export/${usuario}?startDate=${startDate.value}&endDate=${endDate.value}`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("Error en backend export");

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            return alert("No hay datos para exportar.");
        }

        const datos = data.data.map(c => ({
            'Usuario': usuario,
            'Origen': c.caller_id,
            'Fecha Inicio': formatearFecha(c.call_start),
            'Fecha Fin': formatearFecha(c.call_end),
            'Destino': c.called_number,
            'Tipo de llamada': c.tariffdesc || 'N/A',
            'Duración': calcularDuracion(c.call_start, c.call_end)
        }));

        const ws = XLSX.utils.json_to_sheet(datos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'CDRs');

        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buffer]), `CDRs_${usuario}.xlsx`);

    } catch (e) {
        console.error("Error exportando Excel", e);
        alert("Error exportando Excel. Revisa la consola.");
    }
};
</script>

<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <h1 class="text-2xl font-bold mb-6">Historial de Llamadas</h1>

        <!-- FILTROS -->
        <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
            <div>
                <input type="date" class="border rounded px-3 py-2 mr-3" v-model="startDate" />
                <input type="date" class="border rounded px-3 py-2 mr-3" v-model="endDate" />

                <button @click="cargarCDRs()" class="bg-blue-600 text-white px-4 py-2 rounded">
                    Buscar
                </button>

                <button @click="exportarExcel" class="bg-green-600 text-white px-4 py-2 rounded ml-2">
                    Exportar Excel
                </button>
            </div>
            <di><input type="text" placeholder="Tipo de llamada o número" class="border rounded px-3 py-2"
                    v-model="search" />
                <select v-model="limit" @change="cargarCDRs(1)" class="border my-4 rounded px-3 py-2 ml-3">
                    <option value="17">17 filas</option>
                    <option value="50">50 filas</option>
                    <option value="100">100 filas</option>
                </select>
            </di>
        </div>


        <!-- CARGANDO -->
        <div v-if="loading" class="text-center py-4 text-gray-600">
            Cargando llamadas...
        </div>

        <!-- TABLA -->
        <!-- TABLA COMPLETA CON SCROLL Y HEADER FIJO -->
<div v-else class="bg-white rounded-lg shadow overflow-x-auto">

    <!-- Contenedor que limita la altura y agrega scroll -->
    <div class="max-h-[400px] overflow-y-auto">

        <table class="min-w-full divide-y divide-gray-200">

            <!-- Encabezado fijo -->
            <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Usuario</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Origen</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Fecha Inicio</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Fecha Fin</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Destino</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Tipo de llamada</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Duración</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">

                <!-- Filas -->
                <tr
                    v-for="call in filteredCalls"
                    :key="call.id_call"
                    class="hover:bg-gray-50 transition"
                >
                    <td class="px-4 py-2 text-sm uppercase">{{ usuario }}</td>
                    <td class="px-4 py-2 text-sm uppercase">{{ call.caller_id }}</td>
                    <td class="px-4 py-2 text-sm">{{ formatearFecha(call.call_start) }}</td>
                    <td class="px-4 py-2 text-sm">{{ formatearFecha(call.call_end) }}</td>
                    <td class="px-4 py-2 text-sm uppercase">{{ call.called_number }}</td>
                    <td class="px-4 py-2 text-sm">{{ call.tariffdesc || 'N/A' }}</td>
                    <td class="px-4 py-2 text-sm">
                        {{ calcularDuracion(call.call_start, call.call_end) }}
                    </td>
                </tr>

                <!-- Mensaje cuando no hay resultados -->
                <tr v-if="!loading && filteredCalls.length === 0">
                    <td colspan="7" class="text-center py-4 text-gray-500">
                        No se encontraron llamadas para este rango.
                    </td>
                </tr>

            </tbody>

        </table>

    </div>
</div>


        <!-- PAGINACIÓN -->
        <div class="flex justify-between items-center mt-4">
            <button @click="cargarCDRs(page - 1)" :disabled="page === 1"
                class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                ⬅ Anterior
            </button>

            <span class="text-gray-700 font-semibold">
                Página {{ page }} de {{ totalPages }} — Total: {{ total }}
            </span>

            <button @click="cargarCDRs(page + 1)" :disabled="page === totalPages"
                class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                Siguiente ➡
            </button>
        </div>
    </div>
</template>
