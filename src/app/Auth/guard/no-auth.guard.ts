import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';

export const noAuthGuard: CanActivateFn = () => {
  const _AuthService: AuthService = inject(AuthService);
  const _Router = inject(Router);

  if (_AuthService.isConnected) {
    _Router.navigate(['/', 'Books', 'All']);
    return false;
  } else {
    return true;
  }
};
