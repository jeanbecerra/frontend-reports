<template>
  <div class="panel-layout-container">
    <SidebarComponent />
    
    <div class="main-content-area">
      <HeaderComponent />
      
      <main class="content-wrapper">
        <router-view /> 
      </main>
    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'PanelLayout',
  components: {
    SidebarComponent,
    HeaderComponent
  }
}
</script>