import { createRouter, createWebHistory } from 'vue-router';
// Importa tus vistas públicas
import Login from '../views/Login.vue';

// 1. IMPORTA EL LAYOUT DEL PANEL
import PanelLayout from '../layouts/PanelLayout.vue'; 
// Importa las vistas protegidas (el contenido del panel)
import Dashboard from '../views/Dashboard.vue';
import Home from '../views/Home.vue'; 
// ... Otras vistas

const routes = [
  // RUTA PÚBLICA: LOGIN
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  // 2. RUTA PADRE: LAYOUT DEL PANEL
  {
    path: '/',
    component: PanelLayout, // << ESTA RUTA CARGA EL COMPONENTE CON EL SIDEBAR Y HEADER
    children: [
      // RUTAS HIJAS: SE CARGAN DENTRO DEL PanelLayout
      {
        path: '', // Redirige la raíz / a /dashboard por defecto
        redirect: '/dashboard',
      },
      {
        path: 'dashboard', // La URL será /dashboard
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true } // 🔒 PROTEGIDA
      },
      {
        path: 'home', // La URL será /home
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true } // 🔒 PROTEGIDA
      },
      // ... Agrega más rutas protegidas aquí (ej. /usuarios, /perfil)
    ]
  },

  // 3. CAPTURA CUALQUIER OTRA RUTA (Debe ir al final)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login' // Redirige al login si no se encuentra la ruta
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 4. EL MIDDLEWARE (Guardia de Navegación)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Asumiendo que guardas el token en 'token'

  if (to.meta.requiresAuth && !token) {
    // Si la ruta es protegida Y no hay token, ve a login
    return next('/login');
  } else if (to.path === '/login' && token) {
    // Si la ruta es login Y SÍ hay token, redirige al dashboard
    return next('/dashboard'); 
  }

  next(); // Continúa
});

export default router;