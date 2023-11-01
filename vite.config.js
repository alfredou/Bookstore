import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh({
    excludeExports: ['mapStateToProps', 'mapDispatchToProps']
    })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ["text", "json", "html"]
    }
  },
  build: {
    minify: 'esbuild'
  },
  server: {
    port: 3000
  }
});
