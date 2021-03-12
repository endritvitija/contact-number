import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts } from 'src/app/shared/models/contacts.model';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Contacts[]>(`/contacts`);
  }

  getOne(contactId: number) {
    return this.http.get<Contacts>(`/contacts/${contactId}`);
  }

  edit(payload: Contacts) {
    return this.http.put<Contacts>(`/contacts/${payload.id}`, payload);

  }

  add(payload: Contacts) {
    return this.http.post<Contacts>(`/contacts`, payload);
  }

  delete(id: number) {
    return this.http.delete<Contacts>(`/contacts/${id}`)
  }
}
