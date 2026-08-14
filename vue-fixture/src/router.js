import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/projects', name: 'projects', component: () => import('./views/ProjectsView.vue') },
  { path: '/analytics', name: 'analytics', component: () => import('./views/AnalyticsView.vue') },
  { path: '/settings', name: 'settings', component: () => import('./views/SettingsView.vue') },
  { path: '/help', name: 'help', component: () => import('./views/HelpView.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
