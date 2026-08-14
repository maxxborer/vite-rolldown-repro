<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/app.js';
import { loadFeatureFlags, loadProfile } from '../shared/services/api.js';
import Badge from '../components/common/Badge.vue';

const app = useAppStore();
const { compactMode, density, locale } = storeToRefs(app);
const profile = await loadProfile();
const flags = await loadFeatureFlags();
</script>
<template><section class="page"><div><h1>Settings</h1><p class="muted">Workspace preferences and feature availability.</p></div><div class="panel"><p>Plan <Badge tone="positive">{{ profile.plan }}</Badge></p><p>Region: {{ profile.region }} · Seats: {{ profile.seats }}</p><p>Density: {{ density }} · Locale: {{ locale }}</p><label><input v-model="compactMode" type="checkbox" /> Compact mode</label><p>Flags: {{ Object.keys(flags).filter((key) => flags[key]).join(', ') }}</p></div></section></template>
