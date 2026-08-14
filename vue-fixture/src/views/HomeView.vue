<script setup>
import { useDashboard } from '../composables/useDashboard.js';
import { formatNumber } from '../shared/format/index.js';
import StatCard from '../components/common/StatCard.vue';
import ActivityList from '../components/dashboard/ActivityList.vue';

const { activity, metrics, total, positive } = useDashboard();
</script>
<template><section class="page"><div class="page-header"><div><h1>Overview</h1><p class="muted">Operational snapshot for the current workspace.</p></div></div><div class="grid"><StatCard v-for="item in metrics" :key="item.id" :label="item.label" :value="formatNumber(item.value)" :delta="item.delta" /><StatCard label="Combined" :value="formatNumber(total)" :delta="positive / metrics.length" /></div><ActivityList :items="activity" /></section></template>
