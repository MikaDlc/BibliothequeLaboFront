import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RedirectCommand } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, tap } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'https://localhost:7262/api/Auth/';
  isConnectedSubject: Subject<boolean> = new Subject<boolean>();

  get isConnected() : boolean {
    return !!localStorage.getItem('token');
  }

  constructor(private client: HttpClient) { }

  login(email: string, password: string) {
    return this.client.post<{ accessToken: string}>(this._url + 'Login', { email, password }).pipe(
      tap(res => localStorage.setItem('token', res.accessToken))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.emitIsConnected();
  }

  register(user: User) {
    return this.client.post(this._url + 'Register', user)
  }

  emitIsConnected() {
    this.isConnectedSubject.next(this.isConnected);
  }
}
