<script setup>
import Badge from '../common/Badge.vue';
import { formatCurrency } from '../../shared/format/index.js';
import { statusLabel } from '../../features/projects/labels.js';
defineProps({ project: { type: Object, required: true } });
</script>
<template><article class="panel"><div><strong>{{ project.name }}</strong><Badge :tone="project.status === 'paused' ? 'warning' : 'positive'">{{ statusLabel(project.status) }}</Badge></div><p class="muted">{{ project.owner }} · {{ formatCurrency(project.budget) }}</p><progress :value="project.progress" max="100" /><small>Score {{ project.score }}</small></article></template>
<style scoped>article { display: grid; gap: 10px; } article > div { display: flex; justify-content: space-between; gap: 10px; } progress { width: 100%; }</style>
