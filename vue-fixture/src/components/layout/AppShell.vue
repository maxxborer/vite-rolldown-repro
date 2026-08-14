<script setup>
import SideNav from './SideNav.vue';
import TopBar from './TopBar.vue';
</script>

<template>
  <div class="shell">
    <SideNav />
    <div class="workspace">
      <TopBar />
      <main><slot /></main>
    </div>
  </div>
</template>

<style scoped>
.shell { min-height: 100vh; display: grid; grid-template-columns: 220px 1fr; }
.workspace { min-width: 0; }
main { padding: 24px; }
</style>
