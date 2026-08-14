export const movingAverage = (values, windowSize = 3) => values.map((_, index) => {
  const start = Math.max(0, index - windowSize + 1);
  const slice = values.slice(start, index + 1);
  return slice.reduce((total, value) => total + value, 0) / slice.length;
});

export const normalize = (values) => {
  const max = Math.max(...values, 1);
  return values.map((value) => value / max);
};
