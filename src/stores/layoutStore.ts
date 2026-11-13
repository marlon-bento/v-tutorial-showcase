/*
========
Store responsável pelo gerenciamento de estado do layout da aplicação.
Controla o modo super slim para iframes, o estado de abertura do menu mobile,
o estilo visual da moldura da aplicação e o comportamento de abertura da barra lateral.
========
*/
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type EstiloVisualizacao = 'flutuante' | 'tela_cheia' | 'integrado' | 'vidro' | 'dock'
export type ModoAberturaMenu = 'hover' | 'seta'

export const useLayoutStore = defineStore('layoutStore', () => {
  // Indica se o modo super slim está ativo para ocupar toda a tela em dispositivos móveis
  const super_slim = ref(false)

  // Indica se o menu de tela cheia para dispositivos móveis está aberto
  const mobile_menu_open = ref(false)

  // Armazena o estilo visual da estrutura entre barra lateral e container de sistemas
  const estilo_visualizacao = ref<EstiloVisualizacao>(
    (localStorage.getItem('sistec_estilo_visualizacao') as EstiloVisualizacao) || 'flutuante'
  )

  // Armazena o modo de acionamento da barra lateral no desktop (hover automático ou clique na seta)
  const modo_abertura = ref<ModoAberturaMenu>(
    (localStorage.getItem('sistec_modo_abertura') as ModoAberturaMenu) || 'hover'
  )

  /*
  Define se o modo super slim está ativo.
  Recebe: value (booleano indicando o estado de ativação).
  Devolve: void.
  Por que é usada: Permite que sistemas filhos ou rotas ajustem a exibição das margens no mobile.
  */
  const setSuperSlim = (value: boolean) => {
    super_slim.value = value
  }

  /*
  Alterna ou define diretamente o estado de abertura do menu mobile.
  Recebe: open (booleano opcional para forçar o estado aberto ou fechado).
  Devolve: void.
  Por que é usada: Controla a exibição do menu de sistemas em resoluções de dispositivos móveis.
  */
  const toggleMobileMenu = (open?: boolean) => {
    if (typeof open === 'boolean') {
      mobile_menu_open.value = open
    } else {
      mobile_menu_open.value = !mobile_menu_open.value
    }
  }

  /*
  Fecha o menu mobile.
  Recebe: nada.
  Devolve: void.
  Por que é usada: Garante o fechamento do menu móvel ao trocar de rota ou selecionar uma ação.
  */
  const closeMobileMenu = () => {
    mobile_menu_open.value = false
  }

  /*
  Atualiza o estilo de visualização do layout principal.
  Recebe: novoEstilo (identificador do estilo de visualização escolhido).
  Devolve: void.
  Por que é usada: Permite ao usuário alternar entre o layout flutuante, tela cheia e demais variações.
  */
  const definirEstiloVisualizacao = (novoEstilo: EstiloVisualizacao) => {
    estilo_visualizacao.value = novoEstilo
  }

  /*
  Atualiza o comportamento de abertura da barra lateral no desktop.
  Recebe: novoModo (identificador do modo de abertura: 'hover' ou 'seta').
  Devolve: void.
  Por que é usada: Permite escolher entre expandir o menu passando o mouse ou clicando na seta lateral.
  */
  const definirModoAbertura = (novoModo: ModoAberturaMenu) => {
    modo_abertura.value = novoModo
  }

  watch(estilo_visualizacao, (valor) => {
    localStorage.setItem('sistec_estilo_visualizacao', valor)
  })

  watch(modo_abertura, (valor) => {
    localStorage.setItem('sistec_modo_abertura', valor)
  })

  return {
    super_slim,
    mobile_menu_open,
    estilo_visualizacao,
    modo_abertura,
    setSuperSlim,
    toggleMobileMenu,
    closeMobileMenu,
    definirEstiloVisualizacao,
    definirModoAbertura,
  }
})
