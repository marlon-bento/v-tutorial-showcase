<!--
========
Componente orquestrador da barra lateral (SidebarComponent.vue).
Integra o cabeçalho, a lista de sistemas desktop com drag-and-drop, a gaveta de sistemas mobile
e o menu do usuário, aplicando dinamicamente os estilos de visualização da layoutStore.
========
-->
<template>
  <aside
    class="menu-index"
    :class="[
      `estilo-${layoutStore.estilo_visualizacao}`,
      `modo-${layoutStore.modo_abertura}`,
      {
        'is-super-slim': layoutStore.super_slim,
        'is-sidebar-expanded': is_expanded,
      },
    ]"
  >
    <!-- Aba deslizante para abrir o menu no celular -->
    <div
      class="super-slim-slider"
      :class="{ 'is-open': isMobileOpen }"
      @click="toggleMobile"
      title="Abrir menu da clínica"
      aria-label="Abrir menu da clínica"
    >
      <div class="slider-pull-tab">
        <svg
          class="slider-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>

    <div
      v-if="isMobileOpen"
      class="mobile-page-backdrop"
      @click="closeMobile"
    ></div>

    <div
      class="sidebar-content"
      :class="[
        is_expanded ? 'is-expanded' : 'is-collapsed',
        { 'is-mobile-open': isMobileOpen },
      ]"
      @mouseenter="aoEntrarMouse"
      @mouseleave="aoSairMouse"
    >
      <SidebarCabecalho
        :expandido="is_expanded"
        :is-mobile="isMobile"
        :mostrar-botao-seta="layoutStore.modo_abertura === 'seta'"
        @acao-menu="onMenuAction"
        @fechar-mobile="closeMobile"
        @alternar-menu="ToggleMenu()"
      />

      <div v-if="isMobile && isMobileOpen" class="mobile-search-container">
        <div class="input-icon">
          <span class="input-icon-addon">
            <IconSearch size="18" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control mobile-search-input"
            placeholder="Buscar módulos clínicos..."
          />
        </div>
      </div>

      <div class="border-custom-2"></div>

      <div id="menu-scroll-container" class="menu-scroll-container">
        <SidebarMobileDrawer
          v-if="isMobile"
          :sistemas-filtrados="filteredSistemas"
          :selected-frame-id="props.selectedFrameId"
          @acao-menu="onMenuAction"
        />

        <SidebarDesktopLista
          v-else
          :sistemas="sistemasOrdenados"
          :selected-frame-id="props.selectedFrameId"
          :expandido="is_expanded"
          :theme="theme"
          @atualizar-ordem="salvarNovaOrdem"
        />
      </div>

      <div class="menu border-custom">
        <div class="user-menu">
          <UserInfo
            :expand="is_expanded || isMobile"
            @theme-changed="emit('themechanged')"
            @toggle-settings-modal="emit('open-settings')"
            @close-all="closeAll"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { IconSearch } from '@tabler/icons-vue'
import UserInfo from '@/components/UserInfo.vue'
import SidebarCabecalho from '@/components/sidebar/SidebarCabecalho.vue'
import SidebarDesktopLista from '@/components/sidebar/SidebarDesktopLista.vue'
import SidebarMobileDrawer from '@/components/sidebar/SidebarMobileDrawer.vue'
import { useSidebar } from '@/composables/useSidebar'
import type { Sistema } from '@/types/sistema'

const props = defineProps<{
  selectedFrameId?: string
  sistemas?: Sistema[]
}>()

const emit = defineEmits(['open-settings', 'themechanged'])

const {
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
} = useSidebar(toRef(props, 'sistemas'))

defineExpose({
  ToggleMenu,
  closeAll,
})
</script>

<style lang="scss">
@use '@/components/sidebar/estilos-sidebar.scss';
</style>
