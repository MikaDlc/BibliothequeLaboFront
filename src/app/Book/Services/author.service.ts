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
}
