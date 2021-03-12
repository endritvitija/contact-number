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

  getOne(contactId: number) {
    return this.http.get<Address[]>(
      `/contacts/${contactId}/addresses`
    );
  }
  
  add(payload: Address) {
    return this.http.post<Address>(`/addresses`, payload);
  }

  update(payload: Address, id: number) {
    return this.http.put<Address>(`/addresses/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<Address>(`/addresses/${id}`)
  }

}
