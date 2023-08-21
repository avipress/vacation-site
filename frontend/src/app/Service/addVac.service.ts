import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private apiUrl = 'http://localhost:4000/api/vac/addVac'; 

  constructor(private http: HttpClient) {}

  addVacation(vacationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addVac`, vacationData);
  }
}
