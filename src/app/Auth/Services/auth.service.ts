import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RedirectCommand } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'https://localhost:7262/api/Auth/';

  constructor(private client: HttpClient) { }

  login(email: string, password: string) {
    return this.client.post<{ accessToken: string}>(this._url + 'Login', { email, password }).pipe(
      tap(res => localStorage.setItem('token', res.accessToken))
    );
  }

  register(user: User) {
    return this.client.post(this._url + 'Register', user)
  }
}