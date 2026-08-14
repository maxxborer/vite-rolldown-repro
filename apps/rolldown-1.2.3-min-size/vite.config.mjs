import { createViteConfig } from '../../config/create-vite-config.mjs';

export default createViteConfig(import.meta.url, {
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'shared-small',
              minShareCount: 2,
              minSize: 2048,
            },
          ],
        },
      },
    },
  },
});
