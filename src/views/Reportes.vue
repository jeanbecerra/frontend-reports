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
            <!-- FECHAS + BOTONES -->
            <div class="flex flex-wrap items-center gap-2">
                <input type="date" class="border rounded px-3 py-2" v-model="startDate" />
                <input type="date" class="border rounded px-3 py-2" v-model="endDate" />

                <!-- Botón Buscar -->
                <button @click="cargarCDRs()"
                    class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    <!-- Ícono Lupa -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Buscar
                </button>

                <!-- Botón Exportar Excel -->
                <button @click="exportarExcel"
                    class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    <!-- Ícono Excel -->
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                        viewBox="0,0,256,256">
                        <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <g transform="scale(8.53333,8.53333)">
                                <path
                                    d="M15,3c-0.13457,0.00082 -0.26871,0.01521 -0.40039,0.04297l-0.00195,-0.00195l-9.96875,1.99414l-0.00195,0.00195c-0.94311,0.17905 -1.62599,1.00293 -1.62695,1.96289v16c0.00021,0.9613 0.68429,1.78648 1.62891,1.96484l9.96875,1.99414c0.13238,0.02723 0.26719,0.04097 0.40234,0.04102c1.10457,0 2,-0.89543 2,-2v-20c0,-1.10457 -0.89543,-2 -2,-2zM19,5v3h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v3h6c1.105,0 2,-0.895 2,-2v-16c0,-1.105 -0.895,-2 -2,-2zM23,8h1c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1h-1zM6.18555,10h2.40234l1.24414,2.99023c0.101,0.244 0.18177,0.52666 0.25977,0.84766h0.0332c0.045,-0.193 0.13353,-0.48609 0.26953,-0.87109l1.39063,-2.9668h2.1875l-2.61328,4.95508l2.69141,5.04297h-2.33398l-1.50391,-3.25781c-0.057,-0.115 -0.12369,-0.34697 -0.17969,-0.66797h-0.02148c-0.034,0.154 -0.10113,0.38631 -0.20313,0.69531l-1.51367,3.23242h-2.3457l2.7832,-5.00586zM23,12h1c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1h-1zM23,16h1c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1h-1zM23,20h1c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1h-1z">
                                </path>
                            </g>
                        </g>
                    </svg>
                    Exportar Excel
                </button>
            </div>

            <!-- BUSCADOR + SELECT -->
            <div class="flex flex-wrap items-center gap-2">
                <input type="text" placeholder="Tipo de llamada o número" class="border rounded px-2 py-2"
                    v-model="search" />
                <select v-model="limit" @change="cargarCDRs(1)" class="border rounded px-2 py-2">
                    <option value="17">17 filas</option>
                    <option value="50">50 filas</option>
                    <option value="100">100 filas</option>
                </select>
            </div>
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
                        <tr v-for="call in filteredCalls" :key="call.id_call" class="hover:bg-gray-50 transition">
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
                ← Anterior
            </button>

            <span class="text-gray-700 font-semibold">
                Página {{ page }} de {{ totalPages }} — Total: {{ total }}
            </span>

            <button @click="cargarCDRs(page + 1)" :disabled="page === totalPages"
                class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                Siguiente →
            </button>
        </div>
    </div>
</template>
