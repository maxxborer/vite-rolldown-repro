export const sum = (values) => values.reduce((total, value) => total + value, 0);
export const average = (values) => values.length ? sum(values) / values.length : 0;
export const median = (values) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
export const variance = (values) => {
  const mean = average(values);
  return average(values.map((value) => (value - mean) ** 2));
};
