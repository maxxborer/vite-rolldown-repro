<script setup>
defineProps({ tone: { type: String, default: 'neutral' } });
</script>
<template><span :data-tone="tone"><slot /></span></template>
<style scoped>
span { display: inline-flex; padding: 3px 8px; border-radius: 999px; background: #edf1f6; font-size: 12px; }
span[data-tone='positive'] { background: #e2f5e9; }
span[data-tone='warning'] { background: #fff0cf; }
</style>
