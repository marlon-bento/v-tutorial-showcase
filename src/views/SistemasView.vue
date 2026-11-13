<!--
========
Componente de visualização dos módulos odontológicos (SistemasView.vue).
Substitui os antigos iframes por painéis clínicos nativos com dados fictícios de odontologia.
========
-->
<template>
  <div class="container-xl py-4" v-if="moduloAtual">
    <div class="page-header d-print-none mb-4 mt-0">
      <div class="row g-2 align-items-center">
        <div class="col">
          <div class="page-pretitle">{{ moduloAtual.salaPadrao }}</div>
          <h2 class="page-title">{{ moduloAtual.nome }}</h2>
          <div class="text-secondary small mt-1">{{ moduloAtual.descricao }}</div>
        </div>
        <div class="col-auto ms-auto">
          <span class="badge bg-primary-lt text-primary p-2">
            Responsável: {{ moduloAtual.responsavel }}
          </span>
        </div>
      </div>
    </div>

    <div class="alert alert-info bg-primary-lt border-0 mb-4 d-flex align-items-center justify-content-between">
      <div>
        <strong>Resumo Operacional:</strong> {{ moduloAtual.resumoDia }}
      </div>
      <RouterLink to="/report" class="btn btn-sm btn-primary">
        + Nova Triagem
      </RouterLink>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Registros e Atendimentos — {{ moduloAtual.nome }}</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr>
              <th>Horário / Ref</th>
              <th>Paciente / Item</th>
              <th>Procedimento / Descrição Clínica</th>
              <th>Profissional</th>
              <th>Local</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in moduloAtual.atendimentos" :key="item.id">
              <td class="fw-bold text-nowrap">{{ item.horario }}</td>
              <td class="fw-semibold">{{ item.paciente }}</td>
              <td class="text-secondary">{{ item.procedimento }}</td>
              <td>{{ item.dentista }}</td>
              <td>
                <span class="badge bg-secondary-lt">{{ item.sala }}</span>
              </td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-green-lt text-green': item.status === 'Concluído',
                    'bg-azure-lt text-azure': item.status === 'Em atendimento',
                    'bg-yellow-lt text-yellow': item.status === 'Na recepção',
                    'bg-primary-lt text-primary': item.status === 'Confirmado',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { Sistema } from '@/types/sistema'

const props = defineProps({
  set_app_id: {
    type: Function,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  selectedFrameId: {
    type: String,
    default: null,
  },
  frames: {
    type: Array as () => Sistema[],
    required: true,
  },
})

const moduloAtual = computed(
  () => props.frames.find((s) => s.id === props.id) || props.frames[0] || null
)

watch(
  () => props.id,
  (newId) => {
    props.set_app_id(newId)
    if (moduloAtual.value) {
      document.title = `${moduloAtual.value.nome} - OdontoTec`
    }
  },
  { immediate: true }
)
</script>
