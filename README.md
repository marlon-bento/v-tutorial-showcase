# OdontoTec — v-tutorial Interactive Showcase

> **English Summary:** Interactive live demo and reference implementation for the **[v-tutorial](https://www.npmjs.com/package/v-tutorial)** Vue 3 library. Built as a fictional dental clinic management system (**OdontoTec**), this showcase demonstrates declarative guided onboarding (`<TutorialProvider>` and `<VTutorialStep>`), real user interaction steps (`wait-click`), route-aware transitions, mobile-first responsive breakpoints, custom registered actions, and 5 dynamic workspace layouts.

---

## Sobre o Projeto

O **OdontoTec** é uma aplicação de demonstração desenvolvida em **Vue 3**, **TypeScript**, **Pinia** e **Tabler UI** para apresentar na prática todos os recursos da biblioteca **[v-tutorial](https://www.npmjs.com/package/v-tutorial)**.

Em vez de um exemplo estático simples, este projeto simula um painel clínico integrado real — com Agenda Clínica, Prontuário Digital, Odontograma 3D, Raio-X Panorâmico, Esterilização e Ficha de Triagem — onde o usuário aprende a usar o sistema clicando nos próprios elementos da interface em tempo real.

### Demonstração Online (Live Demo)
Acesse a aplicação rodando diretamente no navegador:
**[https://SEU-USUARIO.github.io/v-tutorial-showcase/](https://SEU-USUARIO.github.io/v-tutorial-showcase/)**

---

## Recursos do `v-tutorial` Demonstrados

* **Componentes Declarativos (`<TutorialProvider>` e `<VTutorialStep>`):** Definição limpa do fluxo de treinamento diretamente no template (`src/components/TutorialSistec.vue`).
* **Passos Interativos Reais (`mode="wait-click"`):** O tutorial aguarda o usuário clicar no botão, link ou menu real da aplicação antes de avançar.
* **Responsividade Mobile-First (`breakpoints`, `target-md`, `placement-md`):**
  * Em telas móveis (`<= 768px`), exibe um passo exclusivo ensinando a abrir a aba deslizante lateral (`.super-slim-slider`) e utiliza posicionamento em `bottom-sheet` / `top-sheet`.
  * No desktop (`md+`), desabilita automaticamente passos exclusivos de celular e adapta os alvos e posicionamentos para a barra lateral.
* **Sincronização com Vue Router (`route` e `rollback-route`):** Navegação automática entre a Recepção (`/`), os Módulos Clínicos (`/sistema/:id`) e a Ficha de Triagem (`/report`), garantindo que voltar um passo restaure a rota e o estado anterior.
* **Ações Registradas (`registerAction`):** Orquestração de estado entre componentes independentes (`openUserMenu`, `closeUserMenu`, `setSidebarExpanded`, `openThemeModal`, `closeThemeModal` e `openFirstSystemIfHome`).
* **Hooks de Ciclo de Vida (`onFinish` e `onStop`):** Limpeza automática de modais e celebração com fogos de artifício (`@fireworks-js/vue`) ao concluir o treinamento.

---

## Destaques da Interface (OdontoTec)

* **5 Estilos de Layout em Tempo Real:** Alterne entre *Flutuante (Padrão)*, *Tela Cheia*, *Integrado*, *Cristal (Glassmorphism)* e *Dock Compacto*.
* **2 Modos de Abertura da Sidebar no Desktop:** Expansão automática ao passar o mouse (*Hover*) ou acionamento por botão de seta lateral (*Clique*), além de reordenação de módulos com Drag-and-Drop (`vuedraggable`).
* **Temas Dinâmicos:** Modo Claro/Escuro, 12 cores primárias de destaque e 5 escalas de cinza persistidas no `localStorage`.
* **Gatilho Flutuante Permanente (FAB):** Botão rápido no canto inferior direito para reiniciar e testar o tutorial a qualquer momento.

---

## Estrutura Principal do Projeto

```text
src/
├── components/
│   ├── TutorialSistec.vue        # Definição declarativa dos 11 passos do tutorial
│   ├── ModalConfig.vue           # Modal de aparência, layouts e reinício do treinamento
│   ├── SidebarComponent.vue      # Barra lateral responsiva (Desktop + Gaveta Mobile)
│   └── UserInfo.vue              # Menu da profissional (Modal no Desktop / Bottom-Sheet no Mobile)
├── composables/
│   ├── useTutorialSistec.ts      # Registro de ações, hooks onFinish/onStop e fogos de artifício
│   ├── useSidebar.ts             # Estado da sidebar, drag-and-drop e integração com v-tutorial
│   └── sistemas.ts               # Dados fictícios dos módulos odontológicos
├── stores/
│   ├── layoutStore.ts            # Controle dos 5 estilos de layout e abertura do menu
│   └── theme.ts                  # Controle de tema claro/escuro e paleta de cores
└── views/
    ├── HomeView.vue              # Painel da recepção clínica
    ├── SistemasView.vue          # Tabela de atendimentos e prontuários por módulo
    └── ReportView.vue            # Formulário rápido de triagem e anamnese