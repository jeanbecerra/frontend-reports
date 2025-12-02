<script>
// En tu HeaderComponent.vue
export default {
    methods: {
        logout() {
            // CAMBIAR 'userToken' A 'token' para que coincida con el guardia
            localStorage.removeItem('token');

            // Redirigir a la página de login
            this.$router.push('/login');
        }
    }
}
</script>

<template>
    <header>
        <h1>Mi Panel de Control</h1>
        <button @click="logout">Cerrar Sesión</button>
    </header>
</template>
