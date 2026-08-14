const cache = new Map();

export const remember = (key, producer) => {
  if (!cache.has(key)) cache.set(key, producer());
  return cache.get(key);
};

export const clearCache = () => cache.clear();
