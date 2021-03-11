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

  getContacts() {
    return this.http.get<Contacts[]>(`${apiUrl}/contacts`);
  }

  addContact(payload: Contacts) {
    debugger
    return this.http.post<Contacts>(`${apiUrl}/contacts`, payload);
  }

  deleteContact(id: number) {
    return this.http.delete<Contacts>(`${apiUrl}/contacts/${id}`)
  }
}
