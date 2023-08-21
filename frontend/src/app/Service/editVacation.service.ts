import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import vacations from '../model/vac';

@Injectable({
  providedIn: 'root'
})
export class EditVacationService {
  getVacationById(vacationId: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}
  getVacById(id: number): Observable<vacations> {
    const apiUrl = `http://localhost:4000/api/vac/${id}`;
    return this.http.get<vacations>(apiUrl);
  }
  editVacation(vacationData: any): Observable<any> {
    return this.http.put('http://localhost:4000/api/vac/updateVac', vacationData);
  }
}
