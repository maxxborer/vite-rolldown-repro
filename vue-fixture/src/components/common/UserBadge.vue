<script setup>
defineProps({ name: String, role: String, notifications: Number });
</script>

<template>
  <div class="user"><span class="avatar">{{ name?.slice(0, 1) }}</span><span><b>{{ name }}</b><small>{{ role }} · {{ notifications }} alerts</small></span></div>
</template>

<style scoped>
.user { display: flex; gap: 10px; align-items: center; }
.avatar { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #e8eef8; }
small { display: block; color: #7a8798; }
</style>
