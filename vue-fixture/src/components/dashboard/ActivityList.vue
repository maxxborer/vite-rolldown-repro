<script setup>
import { formatDate, formatTime } from '../../shared/format/index.js';
defineProps({ items: { type: Array, default: () => [] } });
</script>
<template><div class="panel"><h3>Recent activity</h3><div v-for="item in items" :key="item.id" class="activity"><span><b>{{ item.actor }}</b> {{ item.action }} <i>{{ item.target }}</i></span><small>{{ formatDate(item.at) }} · {{ formatTime(item.at) }}</small></div></div></template>
<style scoped>.activity { display: flex; justify-content: space-between; gap: 18px; padding: 9px 0; border-top: 1px solid #edf0f4; } small { color: #7a8798; white-space: nowrap; } i { font-style: normal; color: #49627d; }</style>
