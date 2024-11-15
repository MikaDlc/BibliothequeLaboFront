import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _url = 'https://localhost:7262/api/Book';
  private _client: HttpClient = inject(HttpClient);

  getBooks() {
    return this._client.get<Book[]>(this._url).pipe();
  }

  getBookById(id: number) {
    return this._client.get<Book>(`${this._url}/${id}`).pipe();
  }

  addBook(book: Book) {
    return this._client.post<Book>(this._url, book).pipe();
  }
}
