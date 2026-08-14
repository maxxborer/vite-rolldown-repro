import vue from '@vitejs/plugin-vue';
import { createVueViteConfig } from '../../config/create-vue-vite-config.mjs';

export default createVueViteConfig(import.meta.url, { plugins: [vue()] });
