import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FORBIDDEN_ROUTE } from '../constants.config';
import { PermisoInterface } from './auth.interfaces';
import { FUNCIONALIDADES_SISTEMA } from '../role.config';
import { isEmpty } from 'class-validator';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const funcionalidad: FUNCIONALIDADES_SISTEMA = route.data['functionality'];
    const tienePermiso: PermisoInterface | undefined =
      this.auth.getPermiso(funcionalidad);

    if (isEmpty(tienePermiso)) {
      this.router.navigate([FORBIDDEN_ROUTE]);
      return false;
    }
    return true;
  }
}
