/*
========
Composable responsável por gerenciar o estado, a ordenação por drag-and-drop,
a filtragem de busca mobile e o controle de abertura (hover, seta ou mobile) da barra lateral.
========
*/
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { useLayoutStore } from '@/stores/layoutStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import type { Sistema } from '@/types/sistema'
import { useTutorial } from 'v-tutorial'

export function useSidebar(sistemasRef: Ref<Sistema[] | undefined>) {
  const tutorialStore = useTutorialStore()
  const layoutStore = useLayoutStore()

  const { isActive: isTutorialActive, registerAction } = useTutorial()

  const isMobile = ref(false)
  const searchQuery = ref('')

  const is_expanded = ref(
    layoutStore.modo_abertura === 'seta' &&
      typeof window !== 'undefined' &&
      window.localStorage
      ? localStorage.getItem('is_expanded') === 'true'
      : false
  )

  // Registra a ação para o tutorial abrir/fechar a sidebar tanto no Desktop quanto na Gaveta Mobile
  registerAction('setSidebarExpanded', (val: boolean) => {
    is_expanded.value = val
    if (isMobile.value) {
      layoutStore.toggleMobileMenu(val)
    }
  })

  watch(isTutorialActive, (ativo) => {
    if (!ativo) {
      if (isMobile.value) {
        layoutStore.closeMobileMenu()
        is_expanded.value = false
      } else if (layoutStore.modo_abertura === 'hover') {
        is_expanded.value = false
      } else if (typeof window !== 'undefined' && window.localStorage) {
        is_expanded.value = localStorage.getItem('is_expanded') === 'true'
      }
    }
  })

  const theme = ref(
    typeof window !== 'undefined' && window.localStorage
      ? localStorage.getItem('theme') || 'light'
      : 'light'
  )

  const sistemasOrdenados = ref<Sistema[]>([])

  watch(
    () => layoutStore.modo_abertura,
    (novoModo) => {
      if (novoModo === 'hover') {
        is_expanded.value = false
      } else if (typeof window !== 'undefined' && window.localStorage) {
        is_expanded.value = localStorage.getItem('is_expanded') === 'true'
      }
    }
  )

  const updateIsMobile = () => {
    if (typeof window !== 'undefined') {
      isMobile.value = window.innerWidth <= 768
    }
  }

  onMounted(() => {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateIsMobile)
    }
  })

  const isMobileOpen = computed(() => {
    return isMobile.value && (layoutStore.mobile_menu_open || is_expanded.value)
  })

  const aoEntrarMouse = () => {
    if (!isMobile.value && layoutStore.modo_abertura === 'hover') {
      is_expanded.value = true
    }
  }

  const aoSairMouse = () => {
    if (isTutorialActive.value) {
      return
    }
    if (!isMobile.value && layoutStore.modo_abertura === 'hover') {
      is_expanded.value = false
    }
  }

  const closeMobile = () => {
    layoutStore.closeMobileMenu()
    is_expanded.value = false
  }

  const toggleMobile = () => {
    if (isMobileOpen.value) {
      closeMobile()
    } else {
      layoutStore.toggleMobileMenu(true)
      is_expanded.value = true
    }
  }

  const closeAll = () => {
    layoutStore.closeMobileMenu()
    if (isMobile.value) {
      is_expanded.value = false
    }
  }

  const onMenuAction = () => {
    if (isMobile.value) {
      closeMobile()
    }
  }

  const ToggleMenu = (expand?: boolean) => {
    tutorialStore.hide_menu_clicked = true

    if (isMobile.value) {
      toggleMobile()
      return
    }

    if (typeof expand === 'boolean') {
      is_expanded.value = expand
    } else {
      is_expanded.value = !is_expanded.value
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('is_expanded', String(is_expanded.value))
    }
  }

  const ordenarSistemas = () => {
    const sistemasRecebidos = sistemasRef.value || []
    if (!sistemasRecebidos.length) {
      sistemasOrdenados.value = []
      return
    }

    let ordemSalva: string[] = []
    if (typeof window !== 'undefined' && window.localStorage) {
      ordemSalva = JSON.parse(localStorage.getItem('ordem_sistemas') || '[]')
    }
    const ordemMap = new Map(ordemSalva.map((id, index) => [id, index]))
    const getSortIndex = (id: string) => ordemMap.get(id) ?? Infinity

    const sistemasParaOrdenar = [...sistemasRecebidos]
    sistemasParaOrdenar.sort((a, b) => getSortIndex(a.id) - getSortIndex(b.id))

    sistemasOrdenados.value = sistemasParaOrdenar
  }

  watch(sistemasRef, ordenarSistemas, { deep: true, immediate: true })

  const filteredSistemas = computed(() => {
    const list = sistemasOrdenados.value || []
    if (!searchQuery.value.trim()) return list
    const query = searchQuery.value.toLowerCase().trim()
    return list.filter(
      (s) =>
        (s.nome && s.nome.toLowerCase().includes(query)) ||
        (s.descricao && s.descricao.toLowerCase().includes(query))
    )
  })

  const salvarNovaOrdem = (novaLista: Sistema[]) => {
    sistemasOrdenados.value = novaLista
    const novaOrdem = novaLista.map((s) => s.id)
    localStorage.setItem('ordem_sistemas', JSON.stringify(novaOrdem))
  }

  return {
    layoutStore,
    isMobile,
    isMobileOpen,
    is_expanded,
    searchQuery,
    theme,
    sistemasOrdenados,
    filteredSistemas,
    aoEntrarMouse,
    aoSairMouse,
    toggleMobile,
    closeMobile,
    closeAll,
    onMenuAction,
    ToggleMenu,
    salvarNovaOrdem,
  }
}
