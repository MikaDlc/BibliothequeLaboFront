import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Subject, tap } from 'rxjs';
import { User } from '../Models/User';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private $client: HttpClient = inject(HttpClient);
  private _url = 'https://localhost:7262/api/Auth/';
  isConnectedSubject: Subject<boolean> = new Subject<boolean>();

  get isConnected() : boolean {
    return !!localStorage.getItem('token');
  }

  login(email: string, password: string) {
    return this.$client.post<{ accessToken: string }>(this._url + 'Login', { email, password }).pipe(
      tap(res => localStorage.setItem('token', res.accessToken))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.emitIsConnected();
  }

  register(user: User) {
    return this.$client.post(this._url + 'Register', user)
  }

  emitIsConnected() {
    this.isConnectedSubject.next(this.isConnected);
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    const user : any = jwtDecode(token!);
    const userRole = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return userRole === 'Admin';
  }
}
