<!--
========
Componente de informações e menu da profissional (UserInfo.vue).
Renderiza o avatar na barra lateral e controla a exibição do modal de perfil
(no desktop) ou bottom-sheet (no mobile), integrando alvos e ações com o v-tutorial.
========
-->
<template>
  <div class="d-absolute top-0 start-0"></div>
  <div class="navbar-menu">
    <div class="navbar-nav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <div class="nav-item dropup z-3">
            <a
              v-tutorial="'menu-usuario-trigger'"
              :title="userStore.user.name"
              href="#"
              id="user-menu-link"
              class="nav-link d-flex align-items-center lh-1 text-reset p-0 user-avatar-link"
              :class="{ 'px-2': props.expand, 'justify-content-center': !props.expand }"
              aria-label="Abrir menu da profissional"
              @click.prevent="onUserLinkClick"
            >
              <img
                class="avatar avatar-sm avatar-user-img"
                :src="userStore.user.avatar"
                alt="Avatar"
              />
              <div v-if="props.expand" class="ps-2 user-text-container">
                <div class="user-display-name">{{ userStore.user.name }}</div>
                <div class="mt-1 small text-muted">{{ userStore.user.cro }}</div>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <Teleport to="body" v-if="!isMobile">
    <div v-if="isDesktopModalOpen" class="desktop-modal-backdrop" @click="closeDesktopModal"></div>

    <div
      v-if="isDesktopModalOpen"
      id="user-menu"
      class="desktop-modal-container show"
      role="dialog"
      aria-modal="true"
    >
      <div class="desktop-modal-dialog">
        <div class="desktop-modal-header">
          <div class="d-flex align-items-center gap-3">
            <img
              class="avatar avatar-md avatar-user-img-lg"
              :src="userStore.user.avatar"
              alt="Avatar"
            />
            <div class="user-header-info">
              <div class="d-flex align-items-center gap-2">
                <h3 class="m-0 fw-bold user-name-title">
                  {{ userStore.user.name }}
                </h3>
                <span class="badge bg-primary-lt text-primary user-role-badge">
                  {{ userStore.user.cro }}
                </span>
              </div>
              <p class="m-0 text-muted small user-email-subtitle">
                {{ userStore.user.especialidade }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="btn-close-modal"
            @click="closeDesktopModal"
            aria-label="Fechar menu"
            title="Fechar (ESC)"
          >
            <IconX size="20" />
          </button>
        </div>

        <div class="desktop-modal-body">
          <div class="desktop-nav-list">
            <RouterLink
              v-tutorial="'menu-usuario-reportar'"
              to="/report"
              class="desktop-modal-item report-link"
              id="report-link"
              title="Registrar Triagem Clínica"
              @click="handleActionClick"
            >
              <div class="item-icon-wrapper bg-primary-lt text-primary">
                <IconClipboardPlus size="20" />
              </div>
              <div class="item-text-wrapper">
                <span class="item-title">Registrar Triagem Clínica</span>
                <span class="item-subtitle">Preencher ficha rápida de anamnese e recepção</span>
              </div>
              <IconChevronRight size="18" class="item-chevron" />
            </RouterLink>

            <a
              v-tutorial="'menu-usuario-tema'"
              href="#"
              class="desktop-modal-item theme-link"
              id="theme-link"
              title="Alternar tema"
              @click.prevent="handleThemeClick"
            >
              <div class="item-icon-wrapper bg-azure-lt text-azure">
                <IconBrush size="20" />
              </div>
              <div class="item-text-wrapper">
                <span class="item-title">Alternar tema</span>
                <span class="item-subtitle">Personalizar layout da barra lateral e cores</span>
              </div>
              <IconChevronRight size="18" class="item-chevron" />
            </a>

            <div class="desktop-modal-divider"></div>

            <a
              href="#"
              class="desktop-modal-item logout-item text-danger"
              title="Encerrar turno"
              @click.prevent="closeDesktopModal"
            >
              <div class="item-icon-wrapper bg-danger-lt text-danger">
                <IconLogout size="20" />
              </div>
              <div class="item-text-wrapper">
                <span class="item-title text-danger">Encerrar Turno Clínico</span>
                <span class="item-subtitle">Fechar sessão do consultório</span>
              </div>
              <IconChevronRight size="18" class="item-chevron text-danger" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport to="body" v-if="isMobile">
    <div v-if="isOpen" class="bottom-sheet-backdrop" @click="closeSheet"></div>

    <div
      id="user-menu-mobile"
      class="bottom-sheet-container"
      :class="{ show: isOpen, 'is-open': isOpen }"
    >
      <div class="bottom-sheet-dialog">
        <div class="bottom-sheet-handle-bar" @click="closeSheet">
          <div class="bottom-sheet-handle"></div>
        </div>

        <div class="bottom-sheet-header">
          <div class="d-flex align-items-center gap-3">
            <img
              class="avatar avatar-md avatar-user-img-lg"
              :src="userStore.user.avatar"
              alt="Avatar"
            />
            <div class="user-header-info">
              <h3 class="m-0 fw-bold user-name-title">
                {{ userStore.user.name }}
              </h3>
              <p class="m-0 text-muted small user-email-subtitle">
                {{ userStore.user.cro }} • {{ userStore.user.especialidade }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="btn-close-sheet"
            @click="closeSheet"
            aria-label="Fechar menu"
          >
            <IconX size="20" />
          </button>
        </div>

        <div class="bottom-sheet-body">
          <div class="bottom-sheet-nav-list">
            <RouterLink
              to="/report"
              class="bottom-sheet-item report-link"
              title="Registrar Triagem Clínica"
              @click="handleActionClick"
            >
              <div class="item-icon-wrapper bg-primary-lt text-primary">
                <IconClipboardPlus size="20" />
              </div>
              <div class="item-text-wrapper">
                <span class="item-title">Registrar Triagem Clínica</span>
                <span class="item-subtitle">Preencher ficha rápida de anamnese e recepção</span>
              </div>
              <IconChevronRight size="18" class="item-chevron" />
            </RouterLink>

            <a
              href="#"
              class="bottom-sheet-item theme-link"
              title="Alternar tema"
              @click.prevent="handleThemeClick"
            >
              <div class="item-icon-wrapper bg-azure-lt text-azure">
                <IconBrush size="20" />
              </div>
              <div class="item-text-wrapper">
                <span class="item-title">Alternar tema</span>
                <span class="item-subtitle">Personalizar layout da barra lateral e cores</span>
              </div>
              <IconChevronRight size="18" class="item-chevron" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  IconBrush,
  IconClipboardPlus,
  IconLogout,
  IconX,
  IconChevronRight,
} from '@tabler/icons-vue'
import { useUserStore } from '@/stores/user'
import { useTutorial } from 'v-tutorial'

const props = defineProps(['expand'])
const emit = defineEmits(['toggle-settings-modal', 'theme-changed', 'close-all'])

const userStore = useUserStore()
const { registerAction } = useTutorial()

const isMobile = ref(false)
const isOpen = ref(false)
const isDesktopModalOpen = ref(false)

registerAction('openUserMenu', () => {
  if (isMobile.value) {
    isOpen.value = true
  } else {
    isDesktopModalOpen.value = true
  }
})
registerAction('closeUserMenu', () => {
  isOpen.value = false
  isDesktopModalOpen.value = false
})

const updateIsMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 768
    if (isMobile.value) {
      isDesktopModalOpen.value = false
    } else {
      isOpen.value = false
    }
  }
}

const onUserLinkClick = () => {
  if (isMobile.value) {
    isOpen.value = !isOpen.value
    return
  }
  isDesktopModalOpen.value = !isDesktopModalOpen.value
}

const closeSheet = () => {
  isOpen.value = false
}

const closeDesktopModal = () => {
  isDesktopModalOpen.value = false
}

const handleActionClick = () => {
  closeSheet()
  closeDesktopModal()
  emit('close-all')
}

const handleThemeClick = () => {
  closeSheet()
  closeDesktopModal()
  emit('close-all')
  emit('toggle-settings-modal')
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (isOpen.value) closeSheet()
    if (isDesktopModalOpen.value) closeDesktopModal()
  }
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateIsMobile)
    window.removeEventListener('keydown', onKeyDown)
  }
})
</script>

<style lang="scss" scoped>
.avatar-user-img {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover !important;
  border-radius: 50% !important;
  flex-shrink: 0 !important;
  display: block;
}

.avatar-user-img-lg {
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover !important;
  border-radius: 50% !important;
  flex-shrink: 0 !important;
  display: block;
}

.navbar-menu,
.navbar-nav,
.nav-item {
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.user-avatar-link {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.35rem 0.5rem !important;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: color-mix(in srgb, var(--tblr-bg-surface), black 12%);
  }
}

.user-text-container {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  max-width: calc(100% - 40px);

  .user-display-name {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--tblr-body-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 100%;
  }
}

.desktop-modal-backdrop {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  z-index: 2490;
  animation: modalFade 0.2s ease-out forwards;
}

.desktop-modal-container {
  position: fixed;
  inset: 0;
  z-index: 2500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  pointer-events: none;

  &.show {
    pointer-events: auto;
  }
}

.desktop-modal-dialog {
  width: 100%;
  max-width: 460px;
  background: var(--tblr-bg-surface);
  border: 1px solid var(--tblr-border-color-translucent);
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.desktop-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.25rem 1rem 1.25rem;
  border-bottom: 1px solid var(--tblr-border-color-translucent);

  .user-header-info {
    min-width: 0;

    .user-name-title {
      font-size: 1.05rem;
      color: var(--tblr-body-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role-badge {
      font-size: 0.68rem;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .user-email-subtitle {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }
  }

  .btn-close-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--tblr-bg-surface-secondary, rgba(0, 0, 0, 0.05));
    border: 1px solid var(--tblr-border-color-translucent);
    color: var(--tblr-body-color);
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: var(--tblr-primary-lt);
      color: var(--tblr-primary);
      transform: scale(1.05);
    }
  }
}

.desktop-modal-body {
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  max-height: calc(85vh - 100px);
  overflow-y: auto;
}

.desktop-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.desktop-modal-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0.95rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--tblr-body-color);
  background: var(--tblr-bg-surface-secondary, transparent);
  border: 1px solid var(--tblr-border-color-translucent);
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover,
  &:active {
    background: var(--tblr-primary-lt);
    border-color: var(--tblr-primary);
    transform: translateY(-1px);

    .item-chevron {
      transform: translateX(3px);
      color: var(--tblr-primary);
    }
  }

  &.logout-item:hover {
    background: var(--tblr-danger-lt);
    border-color: var(--tblr-danger);

    .item-chevron {
      color: var(--tblr-danger);
    }
  }

  .item-icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .item-text-wrapper {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;

    .item-title {
      font-weight: 600;
      font-size: 0.92rem;
      line-height: 1.25;
    }

    .item-subtitle {
      font-size: 0.76rem;
      color: var(--tblr-muted);
      line-height: 1.25;
      margin-top: 2px;
    }
  }

  .item-chevron {
    color: var(--tblr-muted);
    transition:
      transform 0.2s ease,
      color 0.2s ease;
    flex-shrink: 0;
  }
}

.desktop-modal-divider {
  height: 1px;
  background: var(--tblr-border-color-translucent);
  margin: 0.35rem 0;
}

.bottom-sheet-backdrop {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2490;
  animation: modalFade 0.25s ease-out forwards;
}

.bottom-sheet-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2500;
  display: flex;
  justify-content: center;
  pointer-events: none;
  visibility: hidden;
  transform: translateY(100%);
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    visibility 0.3s;

  &.show,
  &.is-open {
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }
}

.bottom-sheet-dialog {
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  max-height: 85dvh;
  background: var(--tblr-bg-surface);
  border-top: 1px solid var(--tblr-border-color-translucent);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.bottom-sheet-handle-bar {
  width: 100%;
  padding: 0.75rem 0 0.25rem 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.bottom-sheet-handle {
  width: 38px;
  height: 4px;
  background: var(--tblr-border-color);
  border-radius: 999px;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--tblr-primary);
  }
}

.bottom-sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem 1rem 1.25rem;
  border-bottom: 1px solid var(--tblr-border-color-translucent);

  .user-header-info {
    min-width: 0;

    .user-name-title {
      font-size: 1.05rem;
      color: var(--tblr-body-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email-subtitle {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .btn-close-sheet {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--tblr-bg-surface-secondary, rgba(0, 0, 0, 0.05));
    border: 1px solid var(--tblr-border-color-translucent);
    color: var(--tblr-body-color);
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: var(--tblr-primary-lt);
      color: var(--tblr-primary);
    }
  }
}

.bottom-sheet-body {
  padding: 1rem 1.25rem 1.5rem 1.25rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.bottom-sheet-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bottom-sheet-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0.95rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--tblr-body-color);
  background: var(--tblr-bg-surface-secondary, transparent);
  border: 1px solid var(--tblr-border-color-translucent);
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover,
  &:active {
    background: var(--tblr-primary-lt);
    border-color: var(--tblr-primary);
    transform: translateY(-1px);

    .item-chevron {
      transform: translateX(2px);
      color: var(--tblr-primary);
    }
  }

  &.logout-item:hover {
    background: var(--tblr-danger-lt);
    border-color: var(--tblr-danger);

    .item-chevron {
      color: var(--tblr-danger);
    }
  }

  .item-icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .item-text-wrapper {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;

    .item-title {
      font-weight: 600;
      font-size: 0.95rem;
      line-height: 1.25;
    }

    .item-subtitle {
      font-size: 0.78rem;
      color: var(--tblr-muted);
      line-height: 1.25;
      margin-top: 2px;
    }
  }

  .item-chevron {
    color: var(--tblr-muted);
    transition:
      transform 0.2s ease,
      color 0.2s ease;
    flex-shrink: 0;
  }
}

.bottom-sheet-divider {
  height: 1px;
  background: var(--tblr-border-color-translucent);
  margin: 0.4rem 0;
}

.section-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tblr-muted);
  padding: 0.2rem 0.5rem;
}

@keyframes modalFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
