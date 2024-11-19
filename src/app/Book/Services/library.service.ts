import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Library} from '../Models/library';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private _url = 'https://localhost:7262/api/Library';
  private $client: HttpClient = inject(HttpClient);

  getLibraries() {
    return this.$client.get<Library[]>(this._url).pipe();
  }
}
