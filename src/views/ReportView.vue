<!--
========
Tela de Ficha de Triagem e Anamnese Rápida (ReportView.vue).
Substitui a antiga tela de reportar erro por um formulário odontológico limpo (.report-card).
========
-->
<template>
  <div class="container-xl py-3 py-md-4">
    <div class="card shadow-sm border-0 report-card">
      <div class="card-header bg-transparent border-bottom py-3">
        <div class="d-flex align-items-center gap-2">
          <div class="avatar bg-primary-lt text-primary rounded">
            <IconClipboardPlus size="24" />
          </div>
          <div>
            <h2 class="card-title m-0 fw-bold">Registrar Triagem &amp; Anamnese Rápida</h2>
            <p class="text-muted small m-0">
              Preencha os dados clínicos do paciente para encaminhamento imediato ao consultório.
            </p>
          </div>
        </div>
      </div>

      <div class="card-body p-3 p-md-4">
        <div v-if="mensagemSucesso" class="alert alert-success mb-3">
          {{ mensagemSucesso }}
        </div>

        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label class="form-label fw-semibold">Nome do Paciente</label>
            <input
              v-model="form.paciente"
              type="text"
              class="form-control"
              placeholder="Ex: Gabriel Martins"
            />
          </div>

          <div class="col-12 col-md-3">
            <label class="form-label fw-semibold">Especialidade</label>
            <select v-model="form.moduloId" class="form-select">
              <option value="agenda-clinica">Agenda Clínica (Geral)</option>
              <option value="odontograma-3d">Ortodontia / Odontograma</option>
              <option value="raio-x-panoramico">Raio-X Panorâmico</option>
              <option value="prontuario-digital">Avaliação / Prontuário</option>
            </select>
          </div>

          <div class="col-12 col-md-3">
            <label class="form-label fw-semibold">Consultório</label>
            <select v-model="form.sala" class="form-select">
              <option value="Consultório 01">Consultório 01</option>
              <option value="Consultório 02">Consultório 02</option>
              <option value="Consultório 03">Consultório 03</option>
            </select>
          </div>

          <div class="col-12">
            <label class="form-label fw-semibold">
              Queixa Principal / Observações de Anamnese (Alergias, Medicamentos em uso):
            </label>
            <textarea
              v-model="form.observacoes"
              rows="4"
              class="form-control"
              placeholder="Descreva a sensibilidade relatada, região dentária ou histórico clínico relevante..."
            ></textarea>
          </div>
        </div>

        <div class="d-flex align-items-start gap-2 text-muted small mt-3 p-2 bg-light-subtle rounded border border-light-subtle">
          <IconInfoCircle size="18" class="text-primary mt-1 flex-shrink-0" />
          <span>
            As informações de triagem ficam imediatamente visíveis no Prontuário Digital para o
            cirurgião-dentista responsável pelo consultório selecionado.
          </span>
        </div>
      </div>

      <div class="card-footer bg-transparent border-top d-flex justify-content-between align-items-center py-3">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="limparFormulario"
        >
          <IconTrash size="18" class="me-1" />
          Limpar
        </button>

        <button
          id="send-report"
          type="button"
          class="btn btn-primary px-4 d-flex align-items-center gap-2"
          @click="salvarTriagem"
        >
          <IconSend size="18" />
          <span>Registrar na Agenda</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { controlaSistemas } from '@/composables/sistemas'
import { IconClipboardPlus, IconSend, IconTrash, IconInfoCircle } from '@tabler/icons-vue'

const { sistemas } = controlaSistemas()

const form = ref({
  paciente: 'Gabriel Martins',
  moduloId: 'agenda-clinica',
  sala: 'Consultório 01',
  observacoes: 'Sensibilidade térmica no molar inferior esquerdo (Dente 36). Sem alergias medicamentosas.',
})

const mensagemSucesso = ref('')

function limparFormulario() {
  form.value.paciente = ''
  form.value.observacoes = ''
  mensagemSucesso.value = ''
}

function salvarTriagem() {
  const nome = form.value.paciente.trim() || 'Paciente sem nome'
  const alvo = sistemas.value.find((s) => s.id === form.value.moduloId) || sistemas.value[0]
  if (alvo) {
    alvo.atendimentos.unshift({
      id: `tr-${Date.now()}`,
      horario: 'Agora',
      paciente: nome,
      procedimento: form.value.observacoes.trim() || 'Triagem clínica inicial',
      dentista: 'Dra. Camila Rocha',
      sala: form.value.sala,
      status: 'Na recepção',
    })
  }
  mensagemSucesso.value = `Triagem de ${nome} registrada e encaminhada ao ${form.value.sala}!`
}
</script>

<style scoped>
.report-card {
  border-radius: 12px;
  transition: box-shadow 0.2s ease-in-out;
}
</style>
