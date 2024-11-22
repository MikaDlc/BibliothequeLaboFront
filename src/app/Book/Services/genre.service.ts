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

  addGenre(newGenre: Genre) {
    try {
      newGenre.gName = newGenre.gName.trim();
      newGenre.gName = newGenre.gName.charAt(0).toUpperCase() + newGenre.gName.slice(1);
      return this.$client.post<Genre>(this._url, newGenre).pipe();
    } catch (e) {
      throw new Error('Error while adding genre');
    }
  }
}
