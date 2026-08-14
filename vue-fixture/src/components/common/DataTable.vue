<script setup>
defineProps({ rows: { type: Array, default: () => [] } });
</script>
<template>
  <div class="table"><div class="row head"><span>Period</span><span>Value</span><span>Moving avg.</span></div><div v-for="row in rows" :key="row.index" class="row"><span>{{ row.index }}</span><span>{{ row.value.toFixed(1) }}</span><span>{{ row.moving.toFixed(1) }}</span></div></div>
</template>
<style scoped>
.table { display: grid; }
.row { display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 9px 4px; border-bottom: 1px solid #edf0f4; }
.head { color: #758196; font-size: 12px; }
</style>
