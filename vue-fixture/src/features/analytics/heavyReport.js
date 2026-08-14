import { movingAverage, normalize } from '../../shared/math/series.js';
import { average, median, variance } from '../../shared/math/statistics.js';

export function buildAnalyticsRows(series) {
  const moving = movingAverage(series, 4);
  const normalized = normalize(series);
  return series.map((value, index) => ({ index: index + 1, value, moving: moving[index], normalized: normalized[index] }));
}

export function calculateProjection(series) {
  const recent = series.slice(-5);
  const trend = recent.at(-1) - recent[0];
  return {
    average: average(series),
    median: median(series),
    variance: variance(series),
    projected: recent.at(-1) + trend / Math.max(recent.length - 1, 1),
  };
}
