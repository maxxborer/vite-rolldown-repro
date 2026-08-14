<script setup>
import { computed } from 'vue';
import { projects as sourceProjects } from '../shared/data/projects.js';
import { rankProjects } from '../features/projects/index.js';
import { useSearch } from '../composables/useSearch.js';
import SearchBox from '../components/common/SearchBox.vue';
import EmptyState from '../components/common/EmptyState.vue';
import ProjectCard from '../components/projects/ProjectCard.vue';

const projects = computed(() => rankProjects(sourceProjects));
const { query, filtered } = useSearch(projects, (project) => `${project.name} ${project.owner} ${project.status}`);
</script>
<template><section class="page"><div class="page-header"><div><h1>Projects</h1><p class="muted">Prioritized portfolio view.</p></div><SearchBox v-model="query" /></div><div v-if="filtered.length" class="grid"><ProjectCard v-for="project in filtered" :key="project.id" :project="project" /></div><EmptyState v-else /></section></template>
