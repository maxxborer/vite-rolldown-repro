import { computed, ref } from 'vue';

export function useSearch(items, selector) {
  const query = ref('');
  const normalizedQuery = computed(() => query.value.trim().toLowerCase());
  const filtered = computed(() => {
    if (!normalizedQuery.value) return items.value;
    return items.value.filter((item) => selector(item).toLowerCase().includes(normalizedQuery.value));
  });
  return { query, filtered };
}
