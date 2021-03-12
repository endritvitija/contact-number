import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Countrie } from 'src/app/shared/models/countrie.model';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Countrie[]>(`/countries`);
  }
}
