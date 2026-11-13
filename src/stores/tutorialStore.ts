import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTutorialStore = defineStore('tutorial', () => {
  const hide_menu_clicked = ref(false)
  const report_button_clicked = ref(false)

  return { hide_menu_clicked, report_button_clicked }
})
