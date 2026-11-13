<!--
========
Subcomponente de conteúdo móvel da barra lateral (SidebarMobileDrawer.vue).
Renderiza a grade de cartões de módulos clínicos otimizada para toque em telas móveis.
========
-->
<template>
  <div class="mobile-systems-grid">
    <div
      v-for="sistema in sistemasFiltrados"
      :key="sistema.id"
      class="mobile-system-card"
      :class="{ 'active-card': selectedFrameId === sistema.id }"
    >
      <router-link
        :to="`/sistema/${sistema.id}`"
        class="mobile-system-link"
        @click="emit('acao-menu')"
      >
        <div
          class="mobile-system-icon text-primary"
          :class="{ grayscale: selectedFrameId !== sistema.id }"
        >
          <IconDental size="26" />
        </div>
        <div class="mobile-system-info">
          <span class="mobile-system-title">{{ sistema.nome }}</span>
          <span v-if="sistema.descricao" class="mobile-system-desc">
            {{ sistema.descricao }}
          </span>
        </div>
      </router-link>
    </div>

    <div v-if="sistemasFiltrados.length === 0" class="text-center text-muted py-4">
      Nenhum módulo encontrado.
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconDental } from '@tabler/icons-vue'
import type { Sistema } from '@/types/sistema'

defineProps<{
  sistemasFiltrados: Sistema[]
  selectedFrameId?: string
}>()

const emit = defineEmits<{
  (e: 'acao-menu'): void
}>()
</script>
