import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/shared/models/address.model';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  constructor(private http: HttpClient) {}

  getAddress(contactId: number) {
    return this.http.get<Address[]>(
      `${apiUrl}/contacts/${contactId}/addresses`
    );
  }

  addContactAddress(payload: Address, contactId: number) {
    debugger
    return this.http.post<Address>(
      `${apiUrl}/contacts/${contactId}/addresses`,
      payload
    );
  }
}
