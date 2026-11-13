<!--
========
Componente declarativo de treinamento interativo do OdontoTec (TutorialSistec.vue).
Define a sequência de passos responsivos (Mobile-First estilo Bootstrap) utilizando
<TutorialProvider> e <VTutorialStep>, além de exibir um gatilho flutuante permanente
sempre que o tutorial não estiver em execução para facilitar testes no Showcase.
========
-->
<template>
  <div class="fireworks-container" v-show="playingFireworks">
    <Fireworks
      ref="fireworks"
      :autoresize="true"
      :options="fireworksOptions"
      :autostart="false"
    />
  </div>

  <!-- GATILHO FLUTUANTE GLOBAL: Visível em qualquer tela sempre que o tutorial NÃO estiver rodando -->
  <Transition name="fab-tutorial-fade">
    <button
      v-if="!isTutorialActive"
      type="button"
      class="v-tutorial-showcase-fab"
      title="Iniciar demonstração interativa do v-tutorial"
      @click="iniciarTreinamentoForcado"
    >
      <span class="fab-pulse-dot"></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="fab-icon"
      >
        <path d="M3 12l3 0" />
        <path d="M12 3l0 3" />
        <path d="M7.8 7.8l-2.2 -2.2" />
        <path d="M16.2 7.8l2.2 -2.2" />
        <path d="M7.8 16.2l-2.2 2.2" />
        <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
      </svg>
      <div class="fab-text-group">
        <span class="fab-label">Testar Tutorial Interativo</span>
        <span class="fab-sublabel">Demo v-tutorial</span>
      </div>
    </button>
  </Transition>

  <TutorialProvider>
    <!-- PASSO 1: Boas-vindas -->
    <VTutorialStep
      id="boas-vindas"
      title="Bem-vindo ao OdontoTec!"
      mode="info"
      placement="center"
      route="/"
      :enter-actions="acoesBoasVindasBase"
      :breakpoints="acoesBoasVindasDesktop"
      :rollback-actions="{ setSidebarExpanded: false }"
    >
      <p class="mb-0">
        Este tutorial é <strong>100% interativo</strong>. Nos passos de ação, você vai tocar ou
        clicar diretamente nos botões reais da clínica para avançar!
      </p>
    </VTutorialStep>

    <!-- PASSO EXTRA MOBILE (xs e sm): Ensina a tocar na aba lateral do celular; desabilitado em md+ (>= 768px) -->
    <VTutorialStep
      id="abrir-gaveta-mobile"
      target=".super-slim-slider"
      title="Menu Lateral no Celular"
      mode="wait-click"
      placement="bottom-sheet"
      hint-text="  Toque na aba lateral para abrir o menu!"
      :after-click-delay="300"
      route="/"
      :enter-actions="{ closeUserMenu: true, setSidebarExpanded: false }"
      :rollback-actions="{ setSidebarExpanded: false }"
      :breakpoints="{ md: { disabled: true } }"
    >
      <p class="mb-0">
        No celular, o menu fica recolhido na lateral esquerda para dar mais espaço aos módulos
        clínicos. <strong>Toque na aba destacada</strong> para abrir a lista de sistemas.
      </p>
    </VTutorialStep>

    <!-- PASSO 2: Selecionar Sistema Clínico -->
    <VTutorialStep
      id="selecionar-sistema"
      target=".mobile-system-link"
      target-md=".sistema-item-row a.button"
      placement="bottom-sheet"
      placement-md="right"
      title="Abra um Módulo Clínico"
      mode="wait-click"
      hint-text="  Clique no módulo destacado para abrir!"
      :after-click-delay="350"
      route="/"
      rollback-route="/"
      :enter-actions="acoesAbrirMenuLimpo"
      :rollback-actions="{ setSidebarExpanded: true }"
    >
      <p class="mb-0">
        Na barra lateral ficam os módulos odontológicos da clínica (Agenda, Prontuário,
        Odontograma, Raio-X e Esterilização).
        <strong>Clique agora no primeiro módulo destacado</strong> para abri-lo.
      </p>
    </VTutorialStep>

    <!-- PASSO 3: Explicação do Painel Principal -->
    <VTutorialStep
      id="explicacao-painel"
      target="#sistemas-frame"
      title="Painel Clínico Integrado"
      mode="info"
      placement="center"
      :enter-actions="{ setSidebarExpanded: false, openFirstSystemIfHome: true }"
      :breakpoints="{
        md: {
          enterActions: { setSidebarExpanded: true, openFirstSystemIfHome: true },
        },
      }"
    >
      <p class="mb-0">
        Veja que o módulo carregou aqui dentro! Você pode alternar entre a Agenda, o Odontograma e
        os Laudos de Raio-X pelo menu lateral com total fluidez.
      </p>
    </VTutorialStep>

    <!-- PASSO 4: Clicar na Logo para voltar -->
    <VTutorialStep
      id="clicar-logo"
      target="#logo a"
      placement="bottom-sheet"
      placement-md="bottom"
      title="Voltar para a Recepção"
      mode="wait-click"
      hint-text="  Clique na Logo do OdontoTec para voltar ao início!"
      :after-click-delay="250"
      :enter-actions="{ setSidebarExpanded: true }"
      :rollback-actions="{ setSidebarExpanded: true, openFirstSystemIfHome: true }"
    >
      <p class="mb-0">
        Sempre que quiser voltar para o painel geral da recepção da clínica, basta clicar na logo
        do OdontoTec no topo do menu.
      </p>
    </VTutorialStep>

    <!-- PASSO 5: Clicar no perfil da profissional -->
    <VTutorialStep
      id="abrir-menu-usuario"
      target="#user-menu-link"
      placement="top-sheet"
      placement-md="right"
      title="Menu da Profissional"
      mode="wait-click"
      hint-text="  Clique no seu perfil para abrir o menu!"
      :after-click-delay="250"
      :enter-actions="acoesAbrirMenuLimpo"
      :rollback-actions="acoesAbrirMenuLimpo"
    >
      <p class="mb-0">
        Aqui embaixo fica o perfil do cirurgião-dentista logado.
        <strong>Clique sobre o nome ou avatar</strong> para abrir as ações rápidas.
      </p>
    </VTutorialStep>

    <!-- PASSO 6: Clicar em Registrar Triagem Clínica -->
    <VTutorialStep
      id="clicar-reportar"
      target=".report-link"
      placement="bottom-sheet"
      placement-md="right"
      title="Registrar Triagem Clínica"
      mode="wait-click"
      hint-text="  Clique em 'Registrar Triagem Clínica'!"
      :after-click-delay="300"
      rollback-route="/"
      :enter-actions="acoesAbrirMenuUsuario"
      :rollback-actions="acoesAbrirMenuUsuario"
    >
      <p class="mb-0">
        Com o menu aberto, <strong>clique na opção "Registrar Triagem Clínica"</strong> para abrir
        a ficha rápida de anamnese e chegada de paciente.
      </p>
    </VTutorialStep>

    <!-- PASSO 7: Explicando a tela de Triagem -->
    <VTutorialStep
      id="tela-report"
      target=".report-card"
      title="Ficha de Triagem e Anamnese"
      mode="info"
      placement="center"
      route="/report"
      :enter-actions="{ closeUserMenu: true, setSidebarExpanded: false }"
    >
      <p class="mb-0">
        Nesta área você registra rapidamente a queixa principal do paciente, alertas clínicos
        (como alergias ou hipertensão) e encaminha direto para o consultório.
      </p>
    </VTutorialStep>

    <!-- PASSO 8: Reabrir o menu do usuário para ir em Aparência -->
    <VTutorialStep
      id="reabrir-menu-usuario-tema"
      target="#user-menu-link"
      placement="top-sheet"
      placement-md="right"
      title="Personalizar o Sistema"
      mode="wait-click"
      hint-text="  Clique no seu perfil para abrir o menu!"
      :after-click-delay="250"
      :enter-actions="acoesAbrirMenuLimpo"
      :rollback-actions="acoesAbrirMenuLimpo"
    >
      <p class="mb-0">
        Agora vamos personalizar o visual da clínica!
        <strong>Clique novamente no seu perfil</strong> ali embaixo.
      </p>
    </VTutorialStep>

    <!-- PASSO 9: Clicar em Alternar Tema -->
    <VTutorialStep
      id="clicar-alternar-tema"
      target=".theme-link"
      placement="bottom-sheet"
      placement-md="right"
      title="Aparência e Layout"
      mode="wait-click"
      hint-text="  Clique em 'Alternar tema'!"
      :after-click-delay="300"
      :enter-actions="acoesAbrirMenuUsuario"
      :rollback-actions="acoesAbrirMenuUsuario"
    >
      <p class="mb-0">
        Agora <strong>clique em "Alternar tema"</strong> para abrir o painel de personalização de
        layout e cores.
      </p>
    </VTutorialStep>

    <!-- PASSO 10: Explicando o Modal de Temas -->
    <VTutorialStep
      id="modal-temas-aberto"
      target="#modal-wrapper .modal-content"
      placement="bottom-sheet"
      placement-md="left"
      title="Deixe do seu jeito!"
      mode="info"
      :enter-actions="{ closeUserMenu: true, setSidebarExpanded: false, openThemeModal: true }"
      :leave-actions="{ closeThemeModal: true }"
    >
      <p class="mb-0">
        Pode testar à vontade! Escolha entre os 5 estilos de visualização (Flutuante, Tela Cheia,
        Integrado, Cristal ou Dock), modo Escuro/Claro e a cor de destaque. Quando terminar, clique
        em <strong>Próximo</strong>.
      </p>
    </VTutorialStep>

    <!-- PASSO 11: Conclusão -->
    <VTutorialStep
      id="conclusao"
      title="Tutorial Concluído!"
      mode="info"
      placement="center"
      route="/"
      :enter-actions="acoesBoasVindasBase"
    >
      <p class="mb-0">
        Parabéns! Você completou o treinamento interativo do OdontoTec. Clique em
        <strong>Concluir</strong> para começar a usar.
      </p>
    </VTutorialStep>
  </TutorialProvider>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { Fireworks } from '@fireworks-js/vue'
import { TutorialProvider, VTutorialStep, useTutorial } from 'v-tutorial'
import { useTutorialSistec } from '@/composables/useTutorialSistec'

const props = defineProps<{
  isForbidden: boolean
}>()

const emit = defineEmits<{
  (e: 'open-theme-modal'): void
  (e: 'close-theme-modal'): void
  (e: 'toggle-sidebar', open: boolean): void
}>()

const { isActive: isTutorialActive } = useTutorial()

const {
  fireworks,
  playingFireworks,
  fireworksOptions,
  acoesBoasVindasBase,
  acoesBoasVindasDesktop,
  acoesAbrirMenuLimpo,
  acoesAbrirMenuUsuario,
  stopFireWork,
  iniciarTreinamentoForcado,
} = useTutorialSistec(toRef(props, 'isForbidden'), emit)

defineExpose({
  stopFireWork,
  startTutorial: iniciarTreinamentoForcado,
})
</script>

<style scoped lang="scss">
.fireworks-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10040;
}

.v-tutorial-showcase-fab {
  position: fixed;
  right: 1.35rem;
  bottom: 1.35rem;
  z-index: 1035;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.65rem 1.15rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: var(--tblr-primary, #206bc4);
  color: #ffffff;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.24),
    0 0 0 4px color-mix(in srgb, var(--tblr-primary, #206bc4), transparent 76%);
  cursor: pointer;
  margin: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    filter: brightness(1.06);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.3),
      0 0 0 6px color-mix(in srgb, var(--tblr-primary, #206bc4), transparent 68%);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  .fab-pulse-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8);
    animation: fabDotPulse 1.8s infinite;
    flex-shrink: 0;
  }

  .fab-icon {
    flex-shrink: 0;
  }

  .fab-text-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.15;
    text-align: left;

    .fab-label {
      font-size: 0.86rem;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .fab-sublabel {
      font-size: 0.68rem;
      font-weight: 500;
      opacity: 0.86;
    }
  }
}

@keyframes fabDotPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.75);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.fab-tutorial-fade-enter-active,
.fab-tutorial-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.fab-tutorial-fade-enter-from,
.fab-tutorial-fade-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.92);
}

@media (max-width: 576px) {
  .v-tutorial-showcase-fab {
    right: 0.9rem;
    bottom: 0.9rem;
    padding: 0.6rem 0.95rem;

    .fab-text-group .fab-sublabel {
      display: none;
    }
  }
}
</style>