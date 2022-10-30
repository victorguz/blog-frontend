import { FUNCIONALIDADES_SISTEMA, ROLES_USUARIOS } from '../role.config';

export interface TokenPayload {
  user: UsuarioAuth;
}
export interface AuthenticationInterface {
  correo: string;
  contrasena: string;
}

export interface PermisoInterface {
  funcionalidadCodigo: FUNCIONALIDADES_SISTEMA;
  accionConsultar: boolean;
  accionCrear: boolean;
  accionEliminar: boolean;
  accionModificar: boolean;
}

export interface UsuarioAuth {
  id: number;
  nombres: string;
  apellidos: string;
  rol: any;
  contrasenaActualizada: boolean;
}

export interface LoginResponse {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  estado: string;
  token: string;
  permisos: PermisoInterface[];
  tipo: string;
  contrasenaActualizada: false;
  rol: any;
}
