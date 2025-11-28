import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'   // ← tu vista protegida
// Puedes ir agregando más vistas protegidas luego

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }  // 🔒 SOLO LOGUEADO
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    //El sigueinte bloque de codigo redirige a un usuario si no esta logueado
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 🔐 Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  next()
})


export default router
