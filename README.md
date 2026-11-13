<img width="1000" height="562" alt="v-tutorial" src="https://github.com/user-attachments/assets/ec106114-4da2-4358-9159-fde748cc29ff" />

# OdontoTec — v-tutorial Interactive Showcase

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://marlon-bento.github.io/v-tutorial-showcase/)
[![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![v-tutorial](https://img.shields.io/badge/v--tutorial-1.0.0-206bc4)](https://www.npmjs.com/package/v-tutorial)

> 🇧🇷 **Português:** Prefere ler em português? [Acesse a documentação em Português (README.pt-BR.md)](./README.pt-BR.md).

---

## Overview

**OdontoTec** is an interactive showcase and reference application built with **Vue 3**, **TypeScript**, **Pinia**, and **Tabler UI** to demonstrate the full capabilities of the **[v-tutorial](https://www.npmjs.com/package/v-tutorial)** library in a realistic production-like environment.

Instead of a minimal static example, this project simulates an integrated dental clinic workspace — featuring Clinical Scheduling, Digital Health Records, 3D Odontogram, Panoramic X-Ray Reports, Sterilization Tracking, and Fast Triage Registration — where users learn how to navigate and customize the system by interacting with real UI elements.

### Live Demo
Try the interactive guided tour directly in your browser:
**[https://marlon-bento.github.io/v-tutorial-showcase/](https://marlon-bento.github.io/v-tutorial-showcase/)**

---

## `v-tutorial` Features Demonstrated

* **Declarative Step Architecture (`<TutorialProvider>` & `<VTutorialStep>`):** All 11 onboarding steps are declaratively defined in `src/components/TutorialSistec.vue`.
* **Real User Interaction (`mode="wait-click"`):** Action steps wait for the user to actually click or tap the highlighted UI buttons, links, or profile menus before advancing.
* **Mobile-First Responsive Breakpoints (`breakpoints`, `target-md`, `placement-md`):**
  * On mobile viewports (`<= 768px`), an exclusive step teaches users how to open the lateral pull-tab drawer (`.super-slim-slider`), using `bottom-sheet` and `top-sheet` placements.
  * On desktop viewports (`md+`), mobile-only steps are automatically disabled (`disabled: true`) and targets/placements adapt seamlessly to the desktop sidebar.
* **Router-Aware Navigation (`route` & `rollback-route`):** Automatically synchronizes steps across the Reception Dashboard (`/`), Clinical Modules (`/sistema/:id`), and Triage Form (`/report`), restoring previous routes if the user steps backward.
* **Cross-Component Registered Actions (`registerAction`):** Orchestrates UI state across decoupled components (`openUserMenu`, `closeUserMenu`, `setSidebarExpanded`, `openThemeModal`, `closeThemeModal`, and `openFirstSystemIfHome`).
* **Lifecycle Hooks (`onFinish` & `onStop`):** Automatically cleans up open modals/drawers and triggers a fireworks celebration (`@fireworks-js/vue`) upon completion.

---

## UI & Workspace Highlights (OdontoTec)

* **5 Real-Time Workspace Layouts:** Switch instantaneously between *Floating (Default)*, *Full Screen*, *Integrated*, *Crystal (Glassmorphism)*, and *Compact Dock*.
* **2 Desktop Sidebar Modes:** Automatic expansion on mouse *Hover* or manual toggle via the *Lateral Arrow Button*, complete with drag-and-drop module reordering (`vuedraggable`).
* **Dynamic Theme Engine:** Light/Dark mode, 12 primary accent colors, and 5 base grayscale palettes persisted in `localStorage`.
* **Global Floating Trigger (FAB):** A persistent floating action button in the bottom-right corner allows restarting and testing the guided tour from any screen whenever the tutorial is inactive.

---

## Project Structure

```text
src/
├── components/
│   ├── TutorialSistec.vue        # Declarative definition of the 11-step guided tour & global FAB
│   ├── ModalConfig.vue           # Appearance, layout style, sidebar mode & tutorial restart modal
│   ├── SidebarComponent.vue      # Responsive sidebar orchestrator (Desktop + Mobile Drawer)
│   └── UserInfo.vue              # Professional profile menu (Desktop Modal / Mobile Bottom-Sheet)
├── composables/
│   ├── useTutorialSistec.ts      # Action registrations, onFinish/onStop hooks & fireworks control
│   ├── useSidebar.ts             # Sidebar state, drag-and-drop persistence & v-tutorial integration
│   └── sistemas.ts               # Mock clinical data for dental modules and appointments
├── stores/
│   ├── layoutStore.ts            # State management for the 5 layout styles and sidebar behavior
│   └── theme.ts                  # Light/Dark mode and color scheme persistence
└── views/
    ├── HomeView.vue              # Clinical reception dashboard and daily indicators
    ├── SistemasView.vue          # Dynamic module table for appointments and clinical records
    └── ReportView.vue            # Fast clinical triage and anamnesis registration form
```

---

## Getting Started Locally

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Author

Developed by **[Márlon Bento Azevedo](https://github.com/marlon-bento)**.

## License

Released under the MIT License.
