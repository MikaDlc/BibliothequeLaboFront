import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { User } from '../Models/User';
import { jwtDecode } from "jwt-decode";

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
