import { Injectable } from '@angular/core';
import { arrayNotEmpty, isNotEmpty, isNotEmptyObject } from 'class-validator';
import { AuthService } from '../auth/auth.service';
import { MenuOption } from '../interfaces/shared.interfaces';
import { FUNCIONALIDADES_SISTEMA } from '../role.config';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private auth: AuthService) {}

  private sidebarData: MenuOption[] = [
    {
      icon: 'Icono-proyectos.svg',
      label: 'Proyectos',
      viewOptions: false,
      subMenu: [
        {
          routeLink: 'proyectos',
          label: 'proyectos',
          codigoFuncionalidad: FUNCIONALIDADES_SISTEMA.PROYECTOS,
        },
        {
          routeLink: 'reportes',
          label: 'reportes',
          codigoFuncionalidad: FUNCIONALIDADES_SISTEMA.REPORTES,
        },
      ],
    },
    {
      icon: 'Icono_usuarios.svg',
      label: 'Administración',
      viewOptions: false,
      subMenu: [
        {
          routeLink: 'colaboradores',
          label: 'Colaboradores',
          codigoFuncionalidad: FUNCIONALIDADES_SISTEMA.COLABORADORES,
        },
        {
          routeLink: 'clientes',
          label: 'Clientes',
          codigoFuncionalidad: FUNCIONALIDADES_SISTEMA.CLIENTES,
        },
        {
          routeLink: 'roles',
          label: 'Roles',
          codigoFuncionalidad: FUNCIONALIDADES_SISTEMA.ROLES,
        },
        {
          routeLink: 'parametros',
          label: 'Parámetros',
          codigoFuncionalidad: FUNCIONALIDADES_SISTEMA.PARAMETROS,
        },
      ],
    },
  ];

  getSidebarData(): MenuOption[] {
    const opciones: MenuOption[] = [];
    this.sidebarData.forEach((option) => {
      const subs = option.subMenu.filter((sub) => {
        const permiso = this.auth.getPermiso(sub.codigoFuncionalidad);
        return isNotEmpty(permiso) && isNotEmptyObject(permiso);
      });
      if (subs && arrayNotEmpty(subs)) {
        option.subMenu = subs;
        opciones.push(option);
      }
    });

    return opciones;
  }
}
