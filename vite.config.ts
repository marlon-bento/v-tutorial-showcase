/*
========
Arquivo de configuração do Vite (vite.config.ts).
Define o caminho base para publicação no GitHub Pages, plugins do Vue,
atalhos de diretório (@) e configuração do compilador moderno do Sass.
========
*/
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/v-tutorial-showcase/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})