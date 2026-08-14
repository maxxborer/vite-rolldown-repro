import { computed } from 'vue';
import { activity } from '../shared/data/activity.js';
import { metrics } from '../shared/data/metrics.js';
import { sum } from '../shared/math/statistics.js';

export function useDashboard() {
  const total = computed(() => sum(metrics.map((item) => item.value)));
  const positive = computed(() => metrics.filter((item) => item.delta >= 0).length);
  return { activity, metrics, total, positive };
}
