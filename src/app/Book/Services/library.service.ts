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

  addLibrary(library: Library) {
    try {
      library.street = library.street.trim();
      library.street = library.street.charAt(0).toUpperCase() + library.street.slice(1);
      library.city = library.city.trim();
      library.city = library.city.charAt(0).toUpperCase() + library.city.slice(1);
      library.country = library.country.trim();
      library.country = library.country.charAt(0).toUpperCase() + library.country.slice(1);
      return this.$client.post<Library>(this._url, library).pipe();
    } catch (e) {
      throw new Error('Error while adding library');
    }
  }
}
