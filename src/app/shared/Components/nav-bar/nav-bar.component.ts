import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../Models/nav-item';
import { AuthService } from '../../../Auth/Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
    items: NavItem[] | undefined;
    activeItem: NavItem | undefined;
    IsConnected: boolean;

    constructor( private _auth: AuthService) {
      _auth.isConnectedSubject.subscribe({
        next: (value: boolean) => {
          this.IsConnected = value;
          this.initLinks();
        }
      });
      this.IsConnected = _auth.isConnected;
    }

    ngOnInit() {
      this.initLinks();
    }

    logout(){
      this._auth.logout();
      this.initLinks();
    }

    initLinks(){
      if(!this.IsConnected){
        this.items = [
          { label: 'Books', icon: 'pi pi-fw pi-book', routerLink: '/Books/All' },
          { label: 'Login', icon: 'pi pi-fw pi-user', routerLink: '/Auth/Login' },
        ];
        this.activeItem = this.items[0];
      } else {
        this.items = [
          { label: 'Books', icon: 'pi pi-fw pi-book', routerLink: '/Books/All' },
          { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: '/Client/Profile' },
        ];
        this.activeItem = this.items[0];
      }
    }

}
