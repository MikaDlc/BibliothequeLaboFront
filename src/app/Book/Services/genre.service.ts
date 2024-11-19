import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../Models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private _url = 'https://localhost:7262/api/Genre';
  private $client: HttpClient = inject(HttpClient);

  getGenres() {
    return this.$client.get<Genre[]>(this._url).pipe();
  }
}
