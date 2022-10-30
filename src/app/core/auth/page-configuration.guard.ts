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

@Injectable({
  providedIn: 'root',
})
export class PageConfigurationGuard implements CanActivate {
  constructor(private helpers: HelpersService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.helpers.setTitleFromSnapshot(route);

    return true;
  }
}
