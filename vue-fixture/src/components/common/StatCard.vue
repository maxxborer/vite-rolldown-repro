<script setup>
import { formatDelta } from '../../features/analytics/lightFormat.js';
defineProps({ label: String, value: [String, Number], delta: Number });
</script>

<template>
  <article class="panel"><span class="muted">{{ label }}</span><strong>{{ value }}</strong><small>{{ formatDelta(delta ?? 0) }}</small></article>
</template>

<style scoped>
article { display: grid; gap: 8px; }
strong { font-size: 24px; }
small { color: #327a53; }
</style>
