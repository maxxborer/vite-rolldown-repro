export const capitalize = (value) => value ? `${value[0].toUpperCase()}${value.slice(1)}` : '';
export const truncate = (value, length = 42) => value.length > length ? `${value.slice(0, length - 1)}…` : value;
export const pluralize = (count, one, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;
