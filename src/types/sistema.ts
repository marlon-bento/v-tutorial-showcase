export interface PatientAppointment {
  id: string
  horario: string
  paciente: string
  procedimento: string
  dentista: string
  sala: string
  status: 'Em atendimento' | 'Na recepção' | 'Confirmado' | 'Concluído'
}

export interface Sistema {
  id: string
  nome: string
  descricao: string
  resumoDia: string
  responsavel: string
  salaPadrao: string
  atendimentos: PatientAppointment[]
}
