<script setup>
const model = defineModel({ type: String, default: '' });
</script>

<template><input v-model="model" type="search" placeholder="Search projects" /></template>

<style scoped>
input { width: min(320px, 100%); padding: 10px 12px; border: 1px solid #d9e0e9; border-radius: 10px; background: white; }
</style>
