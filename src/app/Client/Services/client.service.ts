import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientDetails} from '../Models/client-details';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private $client: HttpClient = inject(HttpClient);
  private _url = 'https://localhost:7262/api/Client/';

  profile() {
    return this.$client.get<ClientDetails>(this._url + 'profile').pipe();
  }

  updateAdress(client: ClientDetails) {
    return this.$client.put(this._url, client).pipe();
  }
}
