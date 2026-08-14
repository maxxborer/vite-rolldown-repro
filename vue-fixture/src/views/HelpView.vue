<script setup>
import { ref } from 'vue';
import { capitalize, truncate } from '../shared/format/index.js';

const topics = ref([
  { id: 'navigation', text: 'Use the sidebar to switch between lazy-loaded application sections.' },
  { id: 'analytics', text: 'Analytics derives moving averages, projections and normalized series from shared modules.' },
  { id: 'projects', text: 'Project ranking combines status, progress and budget into a deterministic score.' },
]);
</script>
<template><section class="page"><div><h1>Help</h1><p class="muted">A few static help modules keep this route independent.</p></div><article v-for="topic in topics" :key="topic.id" class="panel"><h3>{{ capitalize(topic.id) }}</h3><p>{{ truncate(topic.text, 100) }}</p></article></section></template>
