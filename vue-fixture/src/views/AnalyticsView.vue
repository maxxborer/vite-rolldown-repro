<script setup>
import { computed } from 'vue';
import { weeklySeries } from '../shared/data/metrics.js';
import { createAnalyticsReport } from '../features/analytics/index.js';
import { formatNumber } from '../shared/format/index.js';
import DataTable from '../components/common/DataTable.vue';
import TrendSparkline from '../components/analytics/TrendSparkline.vue';

const report = computed(() => createAnalyticsReport(weeklySeries));
</script>
<template><section class="page"><div><h1>Analytics</h1><p class="muted">Trend calculations intentionally live in a separate feature module.</p></div><div class="panel"><TrendSparkline :values="weeklySeries" /><p>Projected next value: <b>{{ formatNumber(report.projection.projected) }}</b></p></div><div class="panel"><DataTable :rows="report.rows" /></div></section></template>
