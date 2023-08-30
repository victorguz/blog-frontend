import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HelpersService } from '../services/helpers.service';
import { scrollToElement } from '../services/functions.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PageConfigurationGuard implements CanActivate {
  constructor(private helpers: HelpersService) {}

  canActivate(
    snapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.helpers.setTitleFromSnapshot(snapshot);

    if (snapshot.data['scrollToFragment'] && snapshot.fragment) {
      console.log(snapshot.fragment);

      const interval = setInterval(() => {
        const querySelector = '.' + snapshot.fragment;
        try {
          scrollToElement(querySelector);
          clearInterval(interval);
        } catch (error) {}
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
      }, environment.REQUEST_TIMEOUT);
    }
    return true;
  }
}
