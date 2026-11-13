# OdontoTec — Demonstração Interativa do v-tutorial

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://marlon-bento.github.io/v-tutorial-showcase/)
[![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![v-tutorial](https://img.shields.io/badge/v--tutorial-1.0.0-206bc4)](https://www.npmjs.com/package/v-tutorial)

> 🇺🇸 **English:** Prefer to read in English? [Switch to the English documentation (README.md)](./README.md).

---

## Visão Geral

O **OdontoTec** é uma aplicação de demonstração e referência desenvolvida com **Vue 3**, **TypeScript**, **Pinia** e **Tabler UI** para apresentar na prática todos os recursos da biblioteca **[v-tutorial](https://www.npmjs.com/package/v-tutorial)** em um ambiente próximo ao de produção.

Em vez de um exemplo estático básico, este projeto simula um painel odontológico integrado — com Agenda Clínica, Prontuário Digital, Odontograma 3D, Raio-X Panorâmico, Esterilização e Ficha Rápida de Triagem — onde o usuário aprende a navegar e personalizar o sistema interagindo diretamente com os componentes reais da interface.

### Demonstração Online (Live Demo)
Teste o treinamento interativo diretamente no seu navegador:
**[https://marlon-bento.github.io/v-tutorial-showcase/](https://marlon-bento.github.io/v-tutorial-showcase/)**

---

## Recursos do `v-tutorial` Demonstrados

* **Arquitetura Declarativa (`<TutorialProvider>` e `<VTutorialStep>`):** Todos os 11 passos do treinamento são declarados de forma limpa diretamente no template (`src/components/TutorialSistec.vue`).
* **Interação Real do Usuário (`mode="wait-click"`):** Nos passos práticos, o tutorial aguarda o clique ou toque real do usuário sobre os botões, links ou menus destacados para avançar.
* **Responsividade Mobile-First (`breakpoints`, `target-md`, `placement-md`):**
  * Em telas móveis (`<= 768px`), exibe um passo exclusivo ensinando a tocar na aba deslizante lateral (`.super-slim-slider`) e utiliza posicionamento em `bottom-sheet` e `top-sheet`.
  * No desktop (`md+`), passos exclusivos de celular são desabilitados automaticamente (`disabled: true`) e os seletores e posicionamentos se ajustam para a barra lateral.
* **Sincronização com Vue Router (`route` e `rollback-route`):** Navega automaticamente entre a Recepção (`/`), os Módulos Clínicos (`/sistema/:id`) e a Ficha de Triagem (`/report`), restaurando a rota anterior caso o usuário volte um passo.
* **Ações Registradas entre Componentes (`registerAction`):** Orquestra o estado da interface entre componentes desacoplados (`openUserMenu`, `closeUserMenu`, `setSidebarExpanded`, `openThemeModal`, `closeThemeModal` e `openFirstSystemIfHome`).
* **Hooks de Ciclo de Vida (`onFinish` e `onStop`):** Fecha modais e menus pendentes automaticamente e dispara uma comemoração com fogos de artifício (`@fireworks-js/vue`) ao concluir o tour.

---

## Destaques da Interface (OdontoTec)

* **5 Estilos de Visualização em Tempo Real:** Alterne instantaneamente entre *Flutuante (Padrão)*, *Tela Cheia*, *Integrado*, *Cristal (Glassmorphism)* e *Dock Compacto*.
* **2 Modos de Abertura do Menu Lateral no Desktop:** Expansão automática ao passar o mouse (*Hover*) ou acionamento por botão de seta lateral (*Clique*), além de reordenação dos módulos por arrastar e soltar (`vuedraggable`).
* **Motor de Temas Dinâmico:** Modo Claro/Escuro, 12 cores primárias de destaque e 5 escalas de cinza salvas no `localStorage`.
* **Gatilho Flutuante Global (FAB):** Botão flutuante permanente no canto inferior direito que permite reiniciar e testar o tutorial de qualquer tela sempre que o treinamento não estiver ativo.

---

## Estrutura do Projeto

```text
src/
├── components/
│   ├── TutorialSistec.vue        # Definição declarativa dos 11 passos do tutorial e botão flutuante
│   ├── ModalConfig.vue           # Modal de aparência, estilos de layout e reinício do treinamento
│   ├── SidebarComponent.vue      # Orquestrador da barra lateral (Desktop + Gaveta Mobile)
│   └── UserInfo.vue              # Menu da profissional (Modal no Desktop / Bottom-Sheet no Mobile)
├── composables/
│   ├── useTutorialSistec.ts      # Registro de ações, hooks onFinish/onStop e controle de fogos
│   ├── useSidebar.ts             # Estado da sidebar, drag-and-drop e integração com v-tutorial
│   └── sistemas.ts               # Dados clínicos fictícios dos módulos odontológicos
├── stores/
│   ├── layoutStore.ts            # Gerenciamento dos 5 estilos de layout e modo de abertura do menu
│   └── theme.ts                  # Persistência do modo claro/escuro e paleta de cores
└── views/
    ├── HomeView.vue              # Painel da recepção clínica e indicadores do dia
    ├── SistemasView.vue          # Tabela dinâmica de atendimentos e prontuários por módulo
    └── ReportView.vue            # Formulário rápido de triagem clínica e anamnese
```

---

## Como Executar Localmente

1. Clone o repositório

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Gere o build de produção:
   ```bash
   npm run build
   ```

---

## Autor

Desenvolvido por **[Márlon Bento Azevedo](https://github.com/marlon-bento)**.

## Licença

Distribuído sob a licença MIT.