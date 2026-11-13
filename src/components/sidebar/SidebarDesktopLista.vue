<!--
========
Subcomponente de listagem desktop da barra lateral (SidebarDesktopLista.vue).
Gerencia a exibição e a reordenação por arrastar e soltar (drag-and-drop) dos módulos no computador.
========
-->
<template>
  <draggable
    :animation="400"
    ghost-class="ghost-item"
    drag-class="dragging-item"
    @start="aoIniciarArrasto"
    @end="aoFinalizarArrasto"
    v-model="listaInterna"
    item-key="id"
    tag="div"
    class="menu"
  >
    <template #item="{ element: sistema, index }">
      <SistemaItem
        :sistema="sistema"
        :is-first="index === 0"
        :theme="theme"
        :expand="expandido"
        :is_active="selectedFrameId === sistema.id"
      />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import SistemaItem from '@/components/SistemaItem.vue'
import type { Sistema } from '@/types/sistema'

const props = defineProps<{
  sistemas: Sistema[]
  selectedFrameId?: string
  expandido: boolean
  theme: string
}>()

const emit = defineEmits<{
  (e: 'atualizar-ordem', novaLista: Sistema[]): void
}>()

const listaInterna = computed({
  get: () => props.sistemas,
  set: (valor: Sistema[]) => emit('atualizar-ordem', valor),
})

const aoIniciarArrasto = (e: { item: { children: { className: string }[] } }) => {
  e.item.children[0].className += ' dragging'
}

const aoFinalizarArrasto = () => {
  emit('atualizar-ordem', listaInterna.value)
}
</script>
