import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeStore', () => {
  const themes = ref({
    theme: localStorage.getItem('theme') || 'light',
    theme_primary: localStorage.getItem('theme-primary') || 'green',
    theme_base: localStorage.getItem('theme-base') || 'stone',
  })
  
  return { themes }
})
