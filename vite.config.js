import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      // Pass all environment variables to the app
      'process.env': env,
    },
  };
});
