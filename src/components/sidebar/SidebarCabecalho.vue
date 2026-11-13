<!--
========
Subcomponente de cabeçalho da barra lateral (SidebarCabecalho.vue).
Renderiza a logo do OdontoTec (completa ou reduzida), o botão de fechar em telas móveis
e o botão de seta lateral para expandir/recolher quando o modo de abertura por seta está ativo.
========
-->
<template>
  <div class="header-sidebar">
    <div
      id="logo"
      class="logo-wrapper"
      :class="{ 'd-flex justify-content-center': expandido || isMobile }"
    >
      <router-link
        v-tutorial="'logo-sistec'"
        :to="{ name: 'home' }"
        class="m-0"
        @click="emit('acao-menu')"
      >
        <template v-if="expandido || isMobile">
          <img
            v-if="themeStore.themes.theme == 'light'"
            class="img-full"
            src="@/assets/logo-sis.svg"
            alt="OdontoTec"
          />
          <img
            v-else
            class="img-full"
            src="@/assets/logo-sis-dark.svg"
            alt="OdontoTec"
          />
        </template>

        <img class="img-sm" v-else src="@/assets/logo-mini-sis.svg" alt="OdontoTec" />
      </router-link>
    </div>

    <div class="header-actions">
      <button
        v-if="isMobile"
        class="mobile-close-button"
        @click="emit('fechar-mobile')"
        aria-label="Fechar menu"
        title="Fechar menu"
      >
        <IconX size="22" />
      </button>

      <div v-else-if="mostrarBotaoSeta" class="container-toggle">
        <button
          id="toggle-button"
          class="toggle-button"
          @click="emit('alternar-menu')"
          :title="expandido ? 'Recolher menu' : 'Expandir menu'"
          :aria-label="expandido ? 'Recolher menu' : 'Expandir menu'"
        >
          <span class="container-icon">
            <svg
              class="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right icon-open-menu"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7l5 5l-5 5" />
              <path d="M13 7l5 5l-5 5" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { useThemeStore } from '@/stores/theme'

defineProps<{
  expandido: boolean
  isMobile: boolean
  mostrarBotaoSeta: boolean
}>()

const themeStore = useThemeStore()

const emit = defineEmits<{
  (e: 'acao-menu'): void
  (e: 'fechar-mobile'): void
  (e: 'alternar-menu'): void
}>()
</script>
