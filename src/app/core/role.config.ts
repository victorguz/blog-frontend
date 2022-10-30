export enum ROLES_USUARIOS {
  ADMINISTRADOR = 'ADM',
  DIRECTOR = 'DIR',
  PRODUCTOR = 'PRD',
  ARTISTA = 'ART',
}

export enum FUNCIONALIDADES_SISTEMA {
  HOME = 'HOM',
  PROYECTOS = 'PRO',
  ASIGNACIONES = 'ASG',
  ELEMENTOS = 'ELM',
  REVISIONES = 'REV',
  REPORTES = 'REP',
  COLABORADORES = 'COL',
  ROLES = 'ROL',
  CLIENTES = 'CLI',
  PARAMETROS = 'PAR',
}

export const DESCRIPCION_ROLES = {
  [ROLES_USUARIOS.ADMINISTRADOR]: {
    nombre: 'ADMINISTRADOR',
    codigo: 'ADM',
    id: 0,
  },
  [ROLES_USUARIOS.DIRECTOR]: {
    nombre: 'DIRECTOR',
    codigo: 'DIR',
    id: 0,
  },
  [ROLES_USUARIOS.PRODUCTOR]: {
    nombre: 'PRODUCTOR',
    codigo: 'PRD',
    id: 0,
  },
  [ROLES_USUARIOS.ARTISTA]: {
    nombre: 'ARTISTA',
    codigo: 'ART',
    id: 0,
  },
};
