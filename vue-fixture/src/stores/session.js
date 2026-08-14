import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', () => {
  const user = ref({ id: 7, name: 'Alex Morgan', role: 'Administrator' });
  const notifications = ref(4);
  const initials = computed(() => user.value.name.split(' ').map((part) => part[0]).join(''));

  const clearNotifications = () => { notifications.value = 0; };
  return { user, notifications, initials, clearNotifications };
});
