import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getArray() {
    const apiUrl = 'http://localhost:4000/api/vac/${id}';
    return this.http.get<any[]>(apiUrl);
  }
}