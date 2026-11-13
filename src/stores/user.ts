import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: 'dra-camila-01',
    authenticated: true,
    name: 'Dra. Camila Rocha',
    email: 'camila.rocha@odontotec.com.br',
    cro: 'CRO-MG 48.210',
    especialidade: 'Ortodontia & Implantodontia',
    avatar:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' rx='32' fill='%23206bc4'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Fira Sans, sans-serif' font-size='24' font-weight='700'>CR</text></svg>",
  })

  return { user }
})
