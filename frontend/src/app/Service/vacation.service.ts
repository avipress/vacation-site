import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import vacations from '../model/vac';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private myURL = "http://localhost:4000/api/vac/getAllVac";

  constructor(private http: HttpClient) {}

  addVacation(data: vacations): Observable<any> {
    return this.http.post(this.myURL, data);
  }
  getAllVacations(): Observable<vacations[]> {
    return this.http.get<vacations[]>(this.myURL);
  }

}

