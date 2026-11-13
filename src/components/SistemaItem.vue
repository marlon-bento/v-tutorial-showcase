<!--
========
Componente responsável por renderizar cada item de módulo na barra lateral (SistemaItem.vue).
Exibe o ícone dinâmico correspondente ao módulo e o nome quando expandido,
além de registrar o primeiro item da lista para o treinamento guiado via diretiva v-tutorial.
========
-->
<template>
  <div
    class="w-100 sistema-item-row"
    :class="{ 'is-expanded': expand, 'active-row': is_active }"
  >
    <div class="sistema-item-content">
      <router-link
        v-tutorial="props.isFirst ? 'primeiro-sistema-item' : undefined"
        class="button cont"
        :class="{ 'active-link': is_active }"
        :to="`/sistema/${sistema.id}`"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        :aria-label="sistema.nome"
        :data-bs-original-title="sistema.nome"
        :title="`${sistema.nome}${sistema.descricao ? ': ' + sistema.descricao : ''}`"
      >
        <span :class="{ grayscale: !is_active }">
          <component :is="currentIcon" v-if="currentIcon" class="item svg-icon" />
        </span>

        <span v-if="expand" class="text ms-2">
          {{ sistema.nome }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { svgs } from '@/style/svgs'
import { buildIcons } from '@/utils/svgFactory'

const props = defineProps(['sistema', 'theme', 'expand', 'is_active', 'isFirst'])

const icons = buildIcons(svgs)

const currentIcon = computed(() => {
  if (!props.sistema || !props.sistema.nome) return null

  const nomeNormalizado = props.sistema.nome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((word: string, index: number) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')

  return (
    icons.header[nomeNormalizado as keyof typeof icons.header] ||
    icons.header['default'] ||
    null
  )
})
</script>

<style scoped>
.sistema-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
}

.sistema-item-row:not(.is-expanded) {
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

.sistema-item-content {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
}

.sistema-item-row:not(.is-expanded) .sistema-item-content {
  justify-content: center;
  width: 100%;
  height: 100%;
}

.sistema-item-row:not(.is-expanded) .button {
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
