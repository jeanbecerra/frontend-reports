<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('token')     // elimina token
            this.$router.push('/login')          // redirige al login
        }
    }
}
</script>


<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold">Bienvenido al Home</h1>
        <p class="mt-2 text-gray-600">
            Esta es una ruta protegida. Solo usuarios logueados pueden verla.
        </p>
        <button @click="logout" class="bg-red-600 text-white px-3 py-2 rounded">
            Cerrar sesión
        </button>

    </div>
</template>



<style scoped>
/* Estilos opcionales */
</style>
