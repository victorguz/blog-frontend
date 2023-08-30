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
import { HelpersService } from '../services/helpers.service';
import { LOGIN_ROUTE } from '../constants.config';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    public helpers: HelpersService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const debeActualizarContrasena = this.auth.usuario.contrasenaActualizada;
    if (debeActualizarContrasena) {
      this.auth.modalCambiarContrasena();
    }
    if (!this.auth.isAuthenticated()) {
      this.router.navigate([LOGIN_ROUTE]);
      return false;
    }
    return true;
  }
}
