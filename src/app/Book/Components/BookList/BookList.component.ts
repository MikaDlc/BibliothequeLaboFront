import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { AuthService } from '../../../Auth/Services/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './BookList.component.html',
  styleUrl: './BookList.component.css',
})
export class BookListComponent implements OnInit {
  isAuth: boolean = false;
  books: Book[] = [];
  private _bookService: BookService = inject(BookService);
  private _AuthService: AuthService = inject(AuthService);
  
  ngOnInit(): void {
    this.getBooks();
    this._AuthService.isConnectedSubject.subscribe({
      next: (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    });
    this._AuthService.emitIsConnected();
  }
  
 

  getBooks() {
    this._bookService.getBooks().subscribe({
      next: (books) => this.books = books
    });
  }
  
  AddBook() {

  }

}
