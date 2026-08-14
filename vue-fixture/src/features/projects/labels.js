export const projectNavigationLabel = (count) => `Projects · ${count}`;
export const statusLabel = (status) => ({ active: 'Active', review: 'In review', paused: 'Paused' }[status] ?? status);
