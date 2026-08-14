import { remember } from './cache.js';

const latency = (value) => Promise.resolve(value);
export const loadProfile = () => remember('profile', () => latency({ plan: 'pro', seats: 18, region: 'eu' }));
export const loadFeatureFlags = () => remember('flags', () => latency({ forecasts: true, exports: true, audit: false }));
