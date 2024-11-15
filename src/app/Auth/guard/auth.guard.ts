import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

export const authGuard = function (role: string = 'User'): CanActivateFn  {
  return () => {
    const _AuthService: AuthService = inject(AuthService);
    const _Router = inject(Router);

    if (_AuthService.isConnected) {
      const token = localStorage.getItem('token');
      const user : any = jwtDecode(token!);
      const userRole = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (userRole !== role) {
        return _Router.navigate(['/', 'Auth', 'Login']);
      }

      return true;
    } else {
      return _Router.navigate(['/', 'Auth', 'Login']);
    }
  }
};
