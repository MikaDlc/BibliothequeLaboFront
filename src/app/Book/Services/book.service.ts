import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _url = 'https://localhost:7262/api/Book';
  private $client: HttpClient = inject(HttpClient);

  getBooks() {
    return this.$client.get<Book[]>(this._url).pipe();
  }

  getBookById(id: number) {
    return this.$client.get<Book>(`${this._url}/${id}`).pipe();
  }

  addBook(book: Book) {
    let newBook = {
      title: this.majTheFirstLetter(book.title),
      edition: this.majTheFirstLetter(book.edition),
      editionDate: book.editionDate,
      price: book.price,
      authors: book.authors.map(author => author.authorId),
      genres: book.genres.map(genre => this.majTheFirstLetter(genre.gName)),
      libraries: book.libraries.map(library => library.libraryID),
      libraryQuantity: book.libraries.map(library => library.stock)
    }
    return this.$client.post<Book>(this._url, newBook).pipe();
  }

  private majTheFirstLetter(str: string) {
    str = str.trim();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
