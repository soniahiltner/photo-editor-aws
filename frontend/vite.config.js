import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://sy7zdxzhremlc7mo6wedtopcoe0qtwfa.lambda-url.eu-west-3.on.aws',
        changeOrigin: true
      },
    },
  },
})
