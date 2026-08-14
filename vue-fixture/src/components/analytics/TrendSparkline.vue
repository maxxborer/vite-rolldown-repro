<script setup>
import { computed } from 'vue';
import { normalize } from '../../shared/math/series.js';
const props = defineProps({ values: { type: Array, default: () => [] } });
const points = computed(() => normalize(props.values).map((value, index) => `${index * 18},${48 - value * 42}`).join(' '));
</script>
<template><svg viewBox="0 0 220 52" role="img"><polyline :points="points" fill="none" stroke="currentColor" stroke-width="3" /></svg></template>
<style scoped>svg { width: 100%; max-width: 360px; color: #476d9c; }</style>
