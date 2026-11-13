/*
========
Composable dedicado à lógica de negócio do treinamento do OdontoTec (useTutorialSistec.ts).
Isola o controle de fogos de artifício, injeção de rotas, ações globais do modal de temas
e mapas de ações de entrada/rollback para manter o componente TutorialSistec.vue enxuto.
========
*/
import { ref, computed, onMounted, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTutorial } from 'v-tutorial'
import { useLayoutStore } from '@/stores/layoutStore'

export function useTutorialSistec(
  isForbiddenRef: Ref<boolean>,
  emit: {
    (e: 'open-theme-modal'): void
    (e: 'close-theme-modal'): void
    (e: 'toggle-sidebar', open: boolean): void
  }
) {
  const router = useRouter()
  const layoutStore = useLayoutStore()

  const fireworks = ref<any>(null)
  const playingFireworks = ref(false)

  const fireworksOptions = ref({
    intensity: 30,
    flickering: 50,
    particles: 50,
  })

  const {
    configureTutorial,
    registerAction,
    startTutorial,
    onFinish,
    onStop,
    isMobileViewport,
  } = useTutorial()

  configureTutorial({ router })

  registerAction('openThemeModal', () => emit('open-theme-modal'))
  registerAction('closeThemeModal', () => emit('close-theme-modal'))
  registerAction('openFirstSystemIfHome', () => {
    if (router.currentRoute.value.path === '/') {
      const selector = isMobileViewport.value
        ? '.mobile-system-link'
        : '.sistema-item-row a.button'
      const firstSystem = document.querySelector(selector) as HTMLElement | null
      firstSystem?.click()
    }
  })

  const acoesBoasVindasBase = {
    closeThemeModal: true,
    closeUserMenu: true,
    setSidebarExpanded: false,
  }

  const acoesBoasVindasDesktop = computed(() => ({
    md: {
      enterActions: {
        closeThemeModal: true,
        closeUserMenu: true,
        setSidebarExpanded: layoutStore.modo_abertura === 'seta',
      },
    },
  }))

  const acoesAbrirMenuLimpo = {
    closeThemeModal: true,
    closeUserMenu: true,
    setSidebarExpanded: true,
  }

  const acoesAbrirMenuUsuario = {
    closeThemeModal: true,
    setSidebarExpanded: true,
    openUserMenu: true,
  }

  const stopFireWork = () => {
    fireworks.value?.stop()
    playingFireworks.value = false
  }

  const iniciarTreinamentoForcado = () => startTutorial(undefined, true)

  onFinish(async ({ runRegisteredAction }) => {
    emit('close-theme-modal')
    await runRegisteredAction('closeUserMenu')
    await runRegisteredAction(
      'setSidebarExpanded',
      !isMobileViewport.value && layoutStore.modo_abertura === 'seta'
    )
    router.push('/')
    playingFireworks.value = true
    fireworks.value?.start()
    setTimeout(() => {
      stopFireWork()
    }, 12000)
  })

  onStop(async ({ runRegisteredAction }) => {
    emit('close-theme-modal')
    await runRegisteredAction('closeUserMenu')
    await runRegisteredAction(
      'setSidebarExpanded',
      !isMobileViewport.value && layoutStore.modo_abertura === 'seta'
    )
  })

  onMounted(() => {
    setTimeout(() => {
      if (isForbiddenRef.value) return
      startTutorial()
    }, 700)
  })

  return {
    fireworks,
    playingFireworks,
    fireworksOptions,
    acoesBoasVindasBase,
    acoesBoasVindasDesktop,
    acoesAbrirMenuLimpo,
    acoesAbrirMenuUsuario,
    stopFireWork,
    iniciarTreinamentoForcado,
  }
}
