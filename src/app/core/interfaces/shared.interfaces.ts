import { FUNCIONALIDADES_SISTEMA } from '../role.config';
import { TIPOS_ELEMENTOS } from '../constants.config';

export interface MenuOption {
  icon: string;
  label: string;
  viewOptions: boolean;
  subMenu: MenuLink[];
}
export interface MenuLink {
  routeLink: string;
  label: string;
  codigoFuncionalidad: FUNCIONALIDADES_SISTEMA;
}
export interface ModalOptions {
  message: string;
  title?: string;
  image?: string;
  cancelText?: string;
  okText?: string;
  icon?: string;
}

export interface SpinnerMessageOptions {
  message: string;
  title?: string;
  timeoutMillis?: number;
  icon?: string;
  color?: string;
}

export interface RolOptions {
  rolId: string;
  funcionalidades: FunctionsOptions[];
}

export interface FunctionsOptions {
  id?: string;
  funcionalidadId: string;
  funcionalidadNombre: string;
  accionConsultar: boolean;
  accionCrear: boolean;
  accionEliminar: boolean;
  accionModificar: boolean;
}

export interface FormControlComponentDataSelect {
  value: any;
  description: string;
}

export interface Parametro {
  id: number;
  tipo: string;
  nombre: string;
  codigo: string;
  estado: string;
  orden: number;
}
