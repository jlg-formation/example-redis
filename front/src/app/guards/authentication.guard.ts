import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.accountService.account$.value) {
      return true;
    }
    await this.accountService.checkConnection();

    if (this.accountService.account$.value) {
      return true;
    }

    this.router.navigateByUrl('/user/login');
    return false;
  }
}
