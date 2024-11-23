import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';

export const noAuthGuard: CanActivateFn = () => {
  const $authService: AuthService = inject(AuthService);
  const $router = inject(Router);

  if ($authService.isConnected) {
    $router.navigate(['/', 'Books', 'All']);
    return false;
  } else {
    return true;
  }
};
