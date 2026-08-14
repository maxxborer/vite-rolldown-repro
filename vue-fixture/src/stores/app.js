import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const sidebarOpen = ref(true);
  const compactMode = ref(false);
  const locale = ref('en-US');
  const density = computed(() => (compactMode.value ? 'compact' : 'comfortable'));

  const toggleSidebar = () => { sidebarOpen.value = !sidebarOpen.value; };
  const toggleCompactMode = () => { compactMode.value = !compactMode.value; };

  return { sidebarOpen, compactMode, locale, density, toggleSidebar, toggleCompactMode };
});
