import { buildAnalyticsRows, calculateProjection } from './heavyReport.js';

export const createAnalyticsReport = (series) => ({
  rows: buildAnalyticsRows(series),
  projection: calculateProjection(series),
});

export { buildAnalyticsRows, calculateProjection };
export { formatDelta, formatPercent } from './lightFormat.js';
