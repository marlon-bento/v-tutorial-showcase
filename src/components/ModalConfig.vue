<!--
========
Componente de modal de configurações de aparência, layout e treinamento (ModalConfig.vue).
Permite ao usuário personalizar o tema claro/escuro, esquema de cores primárias, escala de cinza,
estilo de visualização da interface, abertura da barra lateral e reiniciar o tutorial interativo.
========
-->
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useThemeStore } from '@/stores/theme'
import {
  useLayoutStore,
  type EstiloVisualizacao,
  type ModoAberturaMenu,
} from '@/stores/layoutStore'
import { useTutorial } from 'v-tutorial'

const props = defineProps<{ exibir_modal: boolean }>()
const emit = defineEmits(['fecharModal'])

// Instância da store de temas para controle de cores e modo claro/escuro
const themeStore = useThemeStore()

// Instância da store de layout para controle da estrutura visual e abertura do menu
const layoutStore = useLayoutStore()

// Instância do motor de tutorial para permitir reiniciar o treinamento pelo modal
const { restartTutorial } = useTutorial()

// Configuração interna de estado visual do modal
const modalRef = ref({ blur: true })

/*
Fecha o modal de configurações e reinicia o tutorial interativo desde o primeiro passo.
Recebe: nada.
Devolve: Promise<void>.
Por que é usada: Permite ao usuário rever o treinamento guiado a qualquer momento pelas configurações.
*/
async function reiniciarTreinamentoSistema() {
  emit('fecharModal')
  await restartTutorial()
}

// Lista de variações de layout disponíveis para escolha no modal
const opcoesEstilo: Array<{
  id: EstiloVisualizacao
  titulo: string
  descricao: string
}> = [
  {
    id: 'flutuante',
    titulo: 'Flutuante (Padrão)',
    descricao: 'Espaçamento nos cantos e bordas arredondadas',
  },
  {
    id: 'tela_cheia',
    titulo: 'Tela Cheia',
    descricao: 'Sem espaços laterais, ocupando 100% da tela',
  },
  {
    id: 'integrado',
    titulo: 'Integrado',
    descricao: 'Menu contínuo no fundo com painel destacado',
  },
  {
    id: 'vidro',
    titulo: 'Cristal (Glass)',
    descricao: 'Visual translúcido com desfoque e borda suave',
  },
  {
    id: 'dock',
    titulo: 'Dock Compacto',
    descricao: 'Menu flutuante centralizado estilo dock lateral',
  },
]

// Lista de comportamentos de abertura da barra lateral no desktop
const opcoesAbertura: Array<{
  id: ModoAberturaMenu
  titulo: string
  descricao: string
}> = [
  {
    id: 'hover',
    titulo: 'Automático (Passar o mouse)',
    descricao: 'Abre suavemente ao aproximar o cursor e recolhe ao sair',
  },
  {
    id: 'seta',
    titulo: 'Botão de Seta Lateral (Clique)',
    descricao: 'Exibe a setinha na borda do menu para abrir e fechar clicando',
  },
]

defineExpose({
  modalRef,
})
</script>

<template>
  <div
    v-if="props.exibir_modal"
    :class="{ 'modal-blur': modalRef.blur, show: props.exibir_modal }"
    id="modal-wrapper"
    class="modal fade"
    tabindex="-1"
    style="display: block"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
      <div v-tutorial="'modal-aparencia-conteudo'" class="modal-content">
        <button
          @click="$emit('fecharModal')"
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div class="modal-status bg-primary"></div>
        <div class="modal-header">
          <h3 class="my-0">Aparência e Visualização</h3>
        </div>
        <div class="modal-body py-4" id="theme-modal">
          <div class="d-flex flex-column gap-4">
            <!-- Estilo de Visualização -->
            <div>
              <label class="form-label fw-bold text-start d-block mb-1">Estilo de visualização</label>
              <p class="form-hint text-start mb-2">
                Escolha como a barra lateral e a área dos sistemas são distribuídas na tela.
              </p>
              <div class="layout-grid">
                <button
                  v-for="opcao in opcoesEstilo"
                  :key="opcao.id"
                  type="button"
                  class="layout-option-card"
                  :class="{ active: layoutStore.estilo_visualizacao === opcao.id }"
                  @click="layoutStore.definirEstiloVisualizacao(opcao.id)"
                >
                  <div class="layout-preview" :class="`preview-${opcao.id}`">
                    <div class="preview-sidebar">
                      <span class="preview-dot"></span>
                      <span class="preview-line"></span>
                      <span class="preview-line"></span>
                    </div>
                    <div class="preview-content"></div>
                  </div>
                  <div class="layout-info">
                    <span class="layout-title">{{ opcao.titulo }}</span>
                    <span class="layout-desc">{{ opcao.descricao }}</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Modo de Abertura da Barra Lateral -->
            <div>
              <label class="form-label fw-bold text-start d-block mb-1">Abertura do menu lateral</label>
              <p class="form-hint text-start mb-2">
                Defina como o menu de sistemas deve expandir no computador.
              </p>
              <div class="opening-mode-grid">
                <button
                  v-for="modo in opcoesAbertura"
                  :key="modo.id"
                  type="button"
                  class="opening-mode-card"
                  :class="{ active: layoutStore.modo_abertura === modo.id }"
                  @click="layoutStore.definirModoAbertura(modo.id)"
                >
                  <div class="opening-icon-box">
                    <svg
                      v-if="modo.id === 'hover'"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M12 8l4 4l-4 4" />
                      <path d="M8 12h8" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M7 7l5 5l-5 5" />
                      <path d="M13 7l5 5l-5 5" />
                    </svg>
                  </div>
                  <div class="opening-text">
                    <span class="opening-title">{{ modo.titulo }}</span>
                    <span class="opening-desc">{{ modo.descricao }}</span>
                  </div>
                </button>
              </div>
            </div>

            <hr class="my-0" />

            <!-- Tema Claro / Escuro -->
            <div class="row g-3">
              <div class="col-12 col-md-5">
                <label class="form-label fw-bold text-start d-block mb-1">Modo de cor</label>
                <p class="form-hint text-start mb-2">Escolha o tema para as aplicações.</p>
                <div class="d-flex gap-2">
                  <label class="form-check flex-fill m-0 mode-pill">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      class="form-check-input"
                      :checked="themeStore.themes.theme === 'light'"
                      @click="themeStore.themes.theme = 'light'"
                    />
                    <span class="form-check-label">Claro</span>
                  </label>
                  <label class="form-check flex-fill m-0 mode-pill">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      class="form-check-input"
                      :checked="themeStore.themes.theme === 'dark'"
                      @click="themeStore.themes.theme = 'dark'"
                    />
                    <span class="form-check-label">Escuro</span>
                  </label>
                </div>
              </div>

              <!-- Esquema de Cores -->
              <div class="col-12 col-md-7">
                <label class="form-label fw-bold text-start d-block mb-1">Esquema de cores</label>
                <p class="form-hint text-start mb-2">Escolha a cor de destaque principal.</p>
                <div class="row g-2 justify-content-start">
                  <div
                    v-for="cor in [
                      'blue',
                      'azure',
                      'indigo',
                      'purple',
                      'pink',
                      'red',
                      'orange',
                      'yellow',
                      'lime',
                      'green',
                      'teal',
                      'cyan',
                    ]"
                    :key="cor"
                    class="col-auto"
                  >
                    <label class="form-colorinput">
                      <input
                        v-model="themeStore.themes.theme_primary"
                        name="theme-primary"
                        type="radio"
                        :value="cor"
                        class="form-colorinput-input"
                      />
                      <span class="form-colorinput-color" :class="`bg-${cor}`"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tema Base (Escala de Cinza) -->
            <div>
              <label class="form-label fw-bold text-start d-block mb-1">Tema base</label>
              <p class="form-hint text-start mb-2">Escolha sua escala de cinza preferida.</p>
              <div class="base-theme-grid">
                <label
                  v-for="base in [
                    { valor: 'slate', nome: 'Slate' },
                    { valor: 'gray', nome: 'Gray' },
                    { valor: 'zinc', nome: 'Zinc' },
                    { valor: 'neutral', nome: 'Neutral' },
                    { valor: 'stone', nome: 'Stone' },
                  ]"
                  :key="base.valor"
                  class="form-check m-0 mode-pill"
                >
                  <input
                    v-model="themeStore.themes.theme_base"
                    type="radio"
                    name="theme-base"
                    :value="base.valor"
                    class="form-check-input"
                  />
                  <span class="form-check-label">{{ base.nome }}</span>
                </label>
              </div>
            </div>

            <hr class="my-0" />

            <!-- Treinamento Guiado do Sistema -->
            <div class="tutorial-restart-box">
              <div class="tutorial-restart-info">
                <span class="tutorial-restart-title">Treinamento Interativo do OdontoTec</span>
                <span class="tutorial-restart-desc">
                  Reveja o passo a passo guiado sobre como alternar entre os módulos clínicos, registrar triagens e personalizar o layout.
                </span>
              </div>
              <button
                type="button"
                class="btn btn-outline-primary btn-restart-tutorial"
                @click="reiniciarTreinamentoSistema"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                </svg>
                <span>Ver Tutorial</span>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="w-100">
            <div class="row">
              <div class="col">
                <a
                  @click="$emit('fecharModal')"
                  href="#"
                  class="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                  id="close-modal"
                >
                  FECHAR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-status {
  border-radius: 0;
}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
  gap: 0.65rem;
}

.layout-option-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  padding: 0.65rem;
  border-radius: 12px;
  border: 1px solid var(--tblr-border-color-translucent);
  background: var(--tblr-bg-surface-secondary, rgba(0, 0, 0, 0.03));
  color: var(--tblr-body-color);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0;

  &:hover {
    border-color: var(--tblr-primary);
    transform: translateY(-1px);
  }

  &.active {
    background: var(--tblr-primary-lt);
    border-color: var(--tblr-primary);
    box-shadow: 0 0 0 1px var(--tblr-primary);
  }
}

.layout-preview {
  height: 58px;
  width: 100%;
  background: var(--tblr-body-bg);
  border: 1px solid var(--tblr-border-color-translucent);
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  margin-bottom: 0.5rem;
  position: relative;

  .preview-sidebar {
    width: 22%;
    background: color-mix(in srgb, var(--tblr-bg-surface), black 8%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 4px;
    gap: 4px;

    .preview-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tblr-primary);
      margin-bottom: 2px;
    }

    .preview-line {
      width: 70%;
      height: 4px;
      border-radius: 2px;
      background: var(--tblr-secondary);
      opacity: 0.45;
    }
  }

  .preview-content {
    flex: 1;
    background: var(--tblr-bg-surface);
  }

  &.preview-flutuante {
    padding: 5px;
    gap: 5px;

    .preview-sidebar {
      border-radius: 5px;
      border: 1px solid var(--tblr-border-color-translucent);
    }

    .preview-content {
      border-radius: 5px;
      border: 1px solid var(--tblr-border-color-translucent);
    }
  }

  &.preview-tela_cheia {
    padding: 0;
    gap: 0;

    .preview-sidebar {
      border-right: 1px solid var(--tblr-border-color-translucent);
    }
  }

  &.preview-integrado {
    padding: 5px 5px 5px 0;
    background: color-mix(in srgb, var(--tblr-bg-surface), black 8%);

    .preview-sidebar {
      background: transparent;
    }

    .preview-content {
      border-radius: 6px;
      border: 1px solid var(--tblr-border-color-translucent);
    }
  }

  &.preview-vidro {
    padding: 5px;
    gap: 5px;
    background: linear-gradient(135deg, var(--tblr-primary-lt), var(--tblr-body-bg));

    .preview-sidebar,
    .preview-content {
      border-radius: 6px;
      border: 1px solid var(--tblr-primary);
      opacity: 0.9;
    }
  }

  &.preview-dock {
    padding: 4px;
    gap: 5px;
    align-items: center;

    .preview-sidebar {
      height: 72%;
      border-radius: 8px;
      border: 1px solid var(--tblr-border-color-translucent);
    }

    .preview-content {
      height: 100%;
      border-radius: 6px;
      border: 1px solid var(--tblr-border-color-translucent);
    }
  }
}

.layout-info {
  display: flex;
  flex-direction: column;

  .layout-title {
    font-weight: 700;
    font-size: 0.85rem;
    line-height: 1.2;
  }

  .layout-desc {
    font-size: 0.72rem;
    color: var(--tblr-muted);
    margin-top: 2px;
    line-height: 1.25;
  }
}

.opening-mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.65rem;
}

.opening-mode-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  border: 1px solid var(--tblr-border-color-translucent);
  background: var(--tblr-bg-surface-secondary, rgba(0, 0, 0, 0.03));
  color: var(--tblr-body-color);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0;

  &:hover {
    border-color: var(--tblr-primary);
  }

  &.active {
    background: var(--tblr-primary-lt);
    border-color: var(--tblr-primary);
    box-shadow: 0 0 0 1px var(--tblr-primary);

    .opening-icon-box {
      background: var(--tblr-primary);
      color: #ffffff;
    }
  }

  .opening-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--tblr-bg-surface);
    border: 1px solid var(--tblr-border-color-translucent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--tblr-primary);
    transition: all 0.2s ease;
  }

  .opening-text {
    display: flex;
    flex-direction: column;
    min-width: 0;

    .opening-title {
      font-weight: 700;
      font-size: 0.86rem;
    }

    .opening-desc {
      font-size: 0.74rem;
      color: var(--tblr-muted);
      line-height: 1.25;
    }
  }
}

.base-theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
}

.mode-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--tblr-border-color-translucent);
  background: var(--tblr-bg-surface-secondary, rgba(0, 0, 0, 0.03));
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--tblr-primary);
  }

  .form-check-input {
    margin-top: 0;
    margin-left: 0;
  }
}

.tutorial-restart-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--tblr-border-color-translucent);
  background: var(--tblr-bg-surface-secondary, rgba(0, 0, 0, 0.03));

  .tutorial-restart-info {
    display: flex;
    flex-direction: column;
    text-align: left;

    .tutorial-restart-title {
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--tblr-body-color);
    }

    .tutorial-restart-desc {
      font-size: 0.76rem;
      color: var(--tblr-muted);
      margin-top: 2px;
    }
  }

  .btn-restart-tutorial {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-weight: 600;
    white-space: nowrap;
    border-radius: 10px;
    margin-right: 0;
  }
}

@media (max-width: 576px) {
  .tutorial-restart-box {
    flex-direction: column;
    align-items: stretch;

    .btn-restart-tutorial {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
