<script>
import BaseModal from "@/components/Modal.vue";

export default {
    name: "LoginPage",
    components: { BaseModal },

    data() {
        return {
            form: {
                email: "",
                password: "",
                remember: false
            },
            loading: false,

            modal: {
                show: false,
                message: "",
                type: ""
            }
        };
    },
    methods: {
        async handleLogin() {
            this.loading = true;

            try {
                const response = await fetch("http://localhost:3308/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login: this.form.email,
                        password: this.form.password,
                    }),
                });

                const data = await response.json();

                if (data.exito) {
                    this.showModal("success", "¡Login exitoso! Bienvenido a la plataforma 👋");
                    localStorage.setItem("token", data.token);
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 1200);

                } else {
                    this.showModal("error", data.mensaje || "Credenciales incorrectas");
                }

            } catch (error) {
                this.showModal("error", "Error al conectar con el servidor");
            } finally {
                setTimeout(() => {
                        this.loading = false;
                    }, 2000); 
            }
        },

        showModal(type, message) {
            this.modal.type = type;
            this.modal.message = message;
            this.modal.show = true;

            setTimeout(() => {
                this.modal.show = false;
            }, 2000);
        }
    }
};
</script>

<template>
    <BaseModal :show="modal.show" :message="modal.message" :type="modal.type" />

    <div class="min-h-screen  bg-gray-200  flex items-center justify-center p-4">
        <div class="max-w-6xl w-full bg-white rounded-2xl shadow-xl  overflow-hidden">
            <div class="flex flex-col md:flex-row">
                <!-- Lado izquierdo - Imagen abstracta -->
                <div class="md:w-1/2 bg-gradient-to-br from-blue-700 to-lime-700 p-8 flex items-center justify-center">
                    <div class="text-white text-center">
                        <div class="w-64 h-64 mx-auto mb-6 relative">
                            <!-- Patrón abstracto moderno -->
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-blue-500 to-lime-500 rounded-full transform rotate-12 opacity-70">
                            </div>
                            <div
                                class="absolute inset-6 bg-gradient-to-l from-gray-200 to-white rounded-full transform -rotate-6 opacity-80">
                            </div>
                            <div class="absolute inset-12 bg-white rounded-full opacity-20"></div>
                            <div class="absolute inset-0 flex items-center justify-center">

                                <svg width="100px" height="80px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17 12C19.7614 12 22 9.76142 22 7C22 4.23858 19.7614 2 17 2C14.2386 2 12 4.23858 12 7C12 7.79984 12.1878 8.55582 12.5217 9.22624C12.6105 9.4044 12.64 9.60803 12.5886 9.80031L12.2908 10.9133C12.1615 11.3965 12.6035 11.8385 13.0867 11.7092L14.1997 11.4114C14.392 11.36 14.5956 11.3895 14.7738 11.4783C15.4442 11.8122 16.2002 12 17 12Z"
                                        fill="#1C274C" />
                                    <path opacity="0.5"
                                        d="M8.03759 7.31617L8.6866 8.4791C9.2723 9.52858 9.03718 10.9053 8.11471 11.8278C8.11471 11.8278 8.11471 11.8278 8.11471 11.8278C8.11459 11.8279 6.99588 12.9468 9.02451 14.9755C11.0525 17.0035 12.1714 15.8861 12.1722 15.8853C12.1722 15.8853 12.1722 15.8853 12.1722 15.8853C13.0947 14.9628 14.4714 14.7277 15.5209 15.3134L16.6838 15.9624C18.2686 16.8468 18.4557 19.0692 17.0628 20.4622C16.2258 21.2992 15.2004 21.9505 14.0669 21.9934C12.1588 22.0658 8.91828 21.5829 5.6677 18.3323C2.41713 15.0817 1.93421 11.8412 2.00655 9.93309C2.04952 8.7996 2.7008 7.77423 3.53781 6.93723C4.93076 5.54428 7.15317 5.73144 8.03759 7.31617Z"
                                        fill="#1C274C" />
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-3xl font-bold mb-4">Bienvenido </h2>
                        <p class="text-blue-100">Ingresa tu cuenta para acceder a la plataforma de reportes</p>
                    </div>
                </div>

                <!-- Lado derecho - Formulario -->
                <div class="md:w-1/2 p-8 md:p-12">
                    <div class="max-w-md mx-auto">
                        <div class="text-center mb-8">
                            <a href="https://www.fravatel.com.pe/"><img class="m-auto w-72"
                                    src="@/assets/logoFravatel.png" alt="Imagen" /></a>

                            <p class="text-gray-600 mt-2">Ingresa tus credenciales para continuar</p>
                        </div>

                        <form @submit.prevent="handleLogin" class="space-y-6">
                            <!-- Campo Email -->
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                                    Usuario
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 2a4 4 0 110 8 4 4 0 010-8z" />
                                            <path d="M4 16c0-3.314 2.686-6 6-6s6 2.686 6 6v1H4v-1z" />
                                        </svg>
                                    </div>
                                    <input id="email" v-model="form.email" type="text" required
                                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        placeholder="Ingresa tu usuario">
                                </div>
                            </div>

                            <!-- Campo Contraseña -->
                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                                    Contraseña
                                </label>

                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input id="password" v-model="form.password"
                                        :type="showPassword ? 'text' : 'password'" required
                                        class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        placeholder="••••••••">

                                    <button type="button" @click="showPassword = !showPassword"
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fill-rule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <svg v-else class="h-5 w-5 text-gray-400" fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                                clip-rule="evenodd" />
                                            <path
                                                d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Recordar contraseña -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember" v-model="form.remember" type="checkbox"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                    <label for="remember" class="ml-2 block text-sm text-gray-700">
                                        Recordar sesión
                                    </label>
                                </div>
                            </div>

                            <!-- Botón de Login -->
                            <button type="submit" :disabled="loading"
                                class="w-full bg-gradient-to-r from-blue-600 to-lime-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span v-if="loading" class="flex items-center justify-center">
                                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none"
                                        viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Iniciando sesión...
                                </span>
                                <span v-else>
                                    Iniciar Sesión
                                </span>
                            </button>

                            <!-- Soporte -->
                            <div class="text-center">
                                <p class="text-gray-600">
                                    ¿Tienes problemas al iniciar sesion?
                                    <a href="#"
                                        class="text-blue-600 hover:text-blue-500 font-medium transition duration-200">
                                        Soporte Fravatel
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
