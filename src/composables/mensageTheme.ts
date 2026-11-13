import { watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

export function conversaComSistemas() {
  const themeStore = useThemeStore()

  watch(
    () => [
      themeStore.themes.theme,
      themeStore.themes.theme_primary,
      themeStore.themes.theme_base,
    ],
    (
      [newTheme, newThemePrimary, newThemeBase]: string[],
      [oldTheme, oldThemePrimary, oldThemeBase]: (string | undefined)[] = []
    ) => {
      if (typeof document === 'undefined') return
      if (oldTheme === undefined || newTheme !== oldTheme) {
        document.documentElement.setAttribute('data-bs-theme', newTheme)
        localStorage.setItem('theme', newTheme)
      }
      if (oldThemePrimary === undefined || newThemePrimary !== oldThemePrimary) {
        document.documentElement.setAttribute('data-bs-theme-primary', newThemePrimary)
        localStorage.setItem('theme-primary', newThemePrimary)
      }
      if (oldThemeBase === undefined || newThemeBase !== oldThemeBase) {
        document.documentElement.setAttribute('data-bs-theme-base', newThemeBase)
        localStorage.setItem('theme-base', newThemeBase)
      }
    },
    { immediate: true }
  )

  return {}
}
