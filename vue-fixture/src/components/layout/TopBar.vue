<script setup>
import { computed } from 'vue';
import { useClock } from '../../composables/useClock.js';
import { useSessionStore } from '../../stores/session.js';
import { formatPercent } from '../../features/analytics/index.js';
import UserBadge from '../common/UserBadge.vue';

const now = useClock();
const session = useSessionStore();
const health = computed(() => formatPercent(0.927));
</script>

<template>
  <header>
    <div><strong>Workspace</strong><span class="muted"> · health {{ health }} · {{ now.toLocaleTimeString() }}</span></div>
    <UserBadge :name="session.user.name" :role="session.user.role" :notifications="session.notifications" />
  </header>
</template>

<style scoped>
header { min-height: 64px; padding: 0 24px; background: white; border-bottom: 1px solid #e3e8ef; display: flex; align-items: center; justify-content: space-between; }
</style>
