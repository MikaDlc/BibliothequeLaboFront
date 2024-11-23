import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

export const authGuard = function (role: string = 'All'): CanActivateFn  {
  return () => {
    const $authService: AuthService = inject(AuthService);
    const $router = inject(Router);

    if ($authService.isConnected) {
      const token = localStorage.getItem('token');
      const user : any = jwtDecode(token!);
      const userRole = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (role === 'All' || role === userRole) {
        return true;
      } else {
        return $router.navigate(['/', 'Auth', 'Login']);
      }
    } else {
      return $router.navigate(['/', 'Auth', 'Login']);
    }
  }
};
