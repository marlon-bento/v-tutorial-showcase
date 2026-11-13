<!--
========
Tela inicial da Recepção Clínica (HomeView.vue).
Exibe o resumo de atendimentos do dia e os módulos clínicos disponíveis na barra lateral,
sem sistema de favoritos e utilizando exclusivamente componentes limpos do Tabler.
========
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import { controlaSistemas } from '@/composables/sistemas'
import { useTutorial } from 'v-tutorial'
import {
  IconCalendarTime,
  IconUsers,
  IconDental,
  IconSparkles,
  IconArrowRight,
} from '@tabler/icons-vue'

const props = defineProps({
  set_app_id: {
    type: Function,
    required: true,
  },
  selectedFrameId: {
    type: String,
    default: null,
  },
})

const { sistemas } = controlaSistemas()
const { restartTutorial } = useTutorial()

onMounted(() => {
  props.set_app_id(null)
})
</script>

<template>
  <div class="container-xl py-4">
    <!-- Cabeçalho limpo padrão Tabler -->
    <div class="page-header d-print-none mb-4 mt-0">
      <div class="row g-2 align-items-center">
        <div class="col">
          <div class="page-pretitle">Painel Clínico Integrado</div>
          <h2 class="page-title">Recepção &amp; Atendimento — OdontoTec</h2>
        </div>
        <div class="col-auto ms-auto d-print-none">
          <button
            type="button"
            class="btn btn-outline-primary d-inline-flex align-items-center gap-2"
            @click="restartTutorial()"
          >
            <IconSparkles size="18" />
            <span>Reiniciar Tutorial Guiado</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Indicadores rápidos da clínica -->
    <div class="row row-deck row-cards mb-4">
      <div class="col-sm-6 col-lg-4">
        <div class="card card-sm">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-auto">
                <span class="bg-primary text-white avatar">
                  <IconCalendarTime size="20" />
                </span>
              </div>
              <div class="col">
                <div class="font-weight-medium fw-bold">14 Consultas Hoje</div>
                <div class="text-secondary small">Agenda de Sexta-feira • Turno Integral</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-4">
        <div class="card card-sm">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-auto">
                <span class="bg-teal text-white avatar">
                  <IconUsers size="20" />
                </span>
              </div>
              <div class="col">
                <div class="font-weight-medium fw-bold">3 Pacientes na Recepção</div>
                <div class="text-secondary small">Check-in concluído • Prontos para chamada</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-lg-4">
        <div class="card card-sm">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-auto">
                <span class="bg-azure text-white avatar">
                  <IconDental size="20" />
                </span>
              </div>
              <div class="col">
                <div class="font-weight-medium fw-bold">3 Consultórios Ativos</div>
                <div class="text-secondary small">Autoclaves e Raio-X Digital operacionais</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Módulos Clínicos da Barra Lateral -->
    <div class="card mb-4">
      <div class="card-header">
        <h3 class="card-title">Módulos Clínicos Disponíveis</h3>
      </div>
      <div class="list-group list-group-flush">
        <RouterLink
          v-for="sistema in sistemas"
          :key="sistema.id"
          :to="`/sistema/${sistema.id}`"
          class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3"
        >
          <div>
            <div class="fw-bold text-reset">{{ sistema.nome }}</div>
            <div class="text-secondary small">{{ sistema.descricao }}</div>
          </div>
          <div class="d-flex align-items-center gap-3">
            <span class="badge bg-primary-lt text-primary d-none d-md-inline-block">
              {{ sistema.salaPadrao }}
            </span>
            <IconArrowRight size="18" class="text-secondary" />
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
