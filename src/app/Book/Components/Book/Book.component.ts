import { Component, Input } from '@angular/core';
import { Book } from '../../Models/book';
import { AuthService } from '../../../Auth/Services/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './Book.component.html',
  styleUrl: './Book.component.css',
})
export class BookComponent {
  _isAuth: boolean = false;
 
  constructor(private _auth : AuthService){
    _auth.isConnectedSubject.subscribe({
      next: (isAuth: boolean) =>{
        console.log('isAuth', isAuth)
        this._isAuth = isAuth
      }
    })
    _auth.emitIsConnected();
  }

  @Input() book: Book = { bookId: 0, title: '', edition: '', editionDate: 2000 ,price: 0 };
}
