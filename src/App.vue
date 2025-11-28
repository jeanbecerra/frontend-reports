<script setup>
// Asegúrate de que Navbar y Login estén en la misma carpeta 'components'
import Login from './components/Login.vue'; // <-- Importa el Login
import Sidevar from './components/Sidevar.vue';

// Si quieres que el login aparezca solo cuando no estás logueado, usarías lógica aquí
// Por ahora, lo mostraremos directamente
</script>

<template>
  <div>
    <Login />
  </div>
</template>

<style scoped>
/* Los estilos del login vienen de Tailwind, no necesitamos nada aquí */
</style>