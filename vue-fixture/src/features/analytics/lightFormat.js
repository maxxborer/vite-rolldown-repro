export const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;
export const formatDelta = (value) => `${value >= 0 ? '+' : ''}${(value * 100).toFixed(1)}%`;
