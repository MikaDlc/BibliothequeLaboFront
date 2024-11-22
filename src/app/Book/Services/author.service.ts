import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Author} from '../Models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private _url = 'https://localhost:7262/api/Author';
  private $client: HttpClient = inject(HttpClient);

  getAuthors() {
    return this.$client.get<Author[]>(this._url).pipe();
  }

  addAuthor(newAuthor: Author) {

    try {
      newAuthor.firstName = newAuthor.firstName.trim();
      newAuthor.name = newAuthor.name.trim();
      newAuthor.firstName = newAuthor.firstName.charAt(0).toUpperCase() + newAuthor.firstName.slice(1);
      newAuthor.name = newAuthor.name.charAt(0).toUpperCase() + newAuthor.name.slice(1);
      return this.$client.post<Author>(this._url, newAuthor).pipe();
    } catch (e) {
      throw new Error('Error while adding author');
    }
  }
}
