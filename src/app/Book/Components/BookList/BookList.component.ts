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
  
  books: Book[] = [];
  private _bookService: BookService = inject(BookService);
  private _AuthService: AuthService = inject(AuthService);
  
  ngOnInit(): void {
    this.getBooks();
  }
  
  get isAuth(): boolean {
    return this._AuthService.isConnected;
  }

  getBooks() {
    this._bookService.getBooks().subscribe({
      next: (books) => this.books = books
    });
  }
  
  AddBook() {
    
  }

}
