<!--
========
Componente raiz da aplicação (App.vue).
Gerencia a estrutura de layout principal entre a barra lateral e o container de visualização (RouterView),
aplicando as variações de visualização, além de integrar o TutorialSistec e o modal de temas.
========
-->
<template>
  <div
    class="app"
    :class="[
      `layout-${layoutStore.estilo_visualizacao}`,
      `abertura-${layoutStore.modo_abertura}`,
      {
        'is-super-slim': layoutStore.super_slim,
      },
    ]"
  >
    <TutorialSistec
      ref="tutorialRef"
      :is-forbidden="false"
      @open-theme-modal="exibir_modal = true"
      @close-theme-modal="exibir_modal = false"
      @toggle-sidebar="(val) => sidebarRef?.ToggleMenu(val)"
    />

    <SidebarComponent
      ref="sidebarRef"
      :sistemas="sistemas"
      :selectedFrameId="selectedFrameId || ''"
      @open-settings="exibir_modal = true"
      @click="tutorialRef?.stopFireWork()"
    />

    <div :class="{ 'page-wrapper': !hide_sidebar }">
      <div id="sistemas-frame" class="iframe-container">
        <RouterView
          :selectedFrameId="selectedFrameId"
          :set_app_id="set_app_id"
          :frames="sistemas"
          :hide_sidebar="hide_sidebar"
        />
      </div>
    </div>

    <ModalConfig :exibir_modal="exibir_modal" @fecharModal="exibir_modal = false" />
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue'
import ModalConfig from '@/components/ModalConfig.vue'
import TutorialSistec from '@/components/TutorialSistec.vue'
import { ref, watch } from 'vue'
import { controlaSistemas } from '@/composables/sistemas'
import { conversaComSistemas } from '@/composables/mensageTheme'
import { useLayoutStore } from '@/stores/layoutStore'
import { useRoute } from 'vue-router'

const sidebarRef = ref<InstanceType<typeof SidebarComponent> | null>(null)
const tutorialRef = ref<InstanceType<typeof TutorialSistec> | null>(null)

const layoutStore = useLayoutStore()
const route = useRoute()

watch(
  () => route.path,
  (newPath) => {
    layoutStore.closeMobileMenu()
    sidebarRef.value?.closeAll?.()
    if (newPath === '/' || newPath === '/report') {
      layoutStore.setSuperSlim(false)
    }
  }
)

conversaComSistemas()
const { sistemas } = controlaSistemas()

const exibir_modal = ref(false)
const hide_sidebar = ref(false)
const selectedFrameId = ref<null | string>(null)

function set_app_id(id: string | null) {
  selectedFrameId.value = id
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

.app {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--tblr-body-bg);
  transition: background-color 0.25s ease;

  /* Variação 1: Flutuante (Padrão) */
  &.layout-flutuante {
    .page-wrapper {
      padding: 0.65rem;
    }
    .iframe-container {
      border-radius: 14px;
      border: 1px solid var(--tblr-border-color-translucent);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
  }

  /* Variação 2: Tela Cheia (Clássico sem espaços laterais) */
  &.layout-tela_cheia {
    .page-wrapper {
      padding: 0;
    }
    .iframe-container {
      border-radius: 0;
      border: none;
      box-shadow: none;
    }
  }

  /* Variação 3: Integrado (Superfície Única estilo Notion / Linear) */
  &.layout-integrado {
    background-color: color-mix(in srgb, var(--tblr-bg-surface), black 5%);

    .page-wrapper {
      padding: 0.55rem 0.55rem 0.55rem 0;
    }
    .iframe-container {
      border-radius: 16px;
      border: 1px solid var(--tblr-border-color-translucent);
      box-shadow: 0 2px 14px rgba(0, 0, 0, 0.06);
    }
  }

  /* Variação 4: Cristal / Glassmorphism */
  &.layout-vidro {
    background: radial-gradient(
      circle at top left,
      color-mix(in srgb, var(--tblr-primary), transparent 88%),
      var(--tblr-body-bg) 60%
    );

    .page-wrapper {
      padding: 0.65rem;
    }
    .iframe-container {
      border-radius: 16px;
      background-color: color-mix(in srgb, var(--tblr-bg-surface), transparent 15%);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid color-mix(in srgb, var(--tblr-primary), var(--tblr-border-color) 78%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }
  }

  /* Variação 5: Dock Compacto */
  &.layout-dock {
    .page-wrapper {
      padding: 0.5rem 0.5rem 0.5rem 0.25rem;
    }
    .iframe-container {
      border-radius: 16px;
      border: 1px solid var(--tblr-border-color-translucent);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.09);
    }
  }
}

.page-wrapper {
  flex: 1 1 auto;
  min-width: 0;
  height: 100vh;
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: padding 0.25s ease;
}

.iframe-sistema {
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  border: none;
  display: block;
}

.topmid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu {
  margin-bottom: 1rem;
}

button {
  margin-right: 0.5rem;
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--tblr-bg-surface);
  border: 1px solid var(--tblr-border-color-translucent);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  overflow-x: hidden;
  transition: border-radius 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.iframe-container > * {
  flex: 1 1 auto;
  min-height: 0;
}

.iframe-container iframe {
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  border: none;
}

.iframe-container iframe[v-show='true'] {
  display: block;
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 0.45rem !important;
  }

  .app.is-super-slim {
    .page-wrapper {
      margin-left: 0 !important;
      padding: 0 !important;
      width: 100vw !important;
    }
    .iframe-container {
      width: 100vw !important;
      border-radius: 0 !important;
      border: none !important;
    }
    .iframe-sistema {
      width: 100vw !important;
    }
  }
}
</style>
