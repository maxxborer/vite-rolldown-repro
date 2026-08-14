<script setup>
import { RouterLink } from 'vue-router';
import { projects } from '../../shared/data/projects.js';
import { projectNavigationLabel } from '../../features/projects/index.js';

const items = [
  { to: '/', label: 'Overview' },
  { to: '/projects', label: projectNavigationLabel(projects.length) },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
  { to: '/help', label: 'Help' },
];
</script>

<template>
  <aside>
    <strong>Northstar</strong>
    <nav>
      <RouterLink v-for="item in items" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
aside { padding: 24px 18px; background: #17202d; color: white; }
nav { display: grid; gap: 6px; margin-top: 28px; }
a { padding: 9px 10px; border-radius: 8px; color: #c9d2df; }
a.router-link-active { background: #2a3647; color: white; }
</style>
