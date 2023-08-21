import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import vacations from '../model/vac';

@Injectable({
  providedIn: 'root',
})
export class FollowersService {
  private baseUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  addFollow(user_id: number, vacation_id: number) {
    const url = `${this.baseUrl}/addFollow`;
    return this.http.post(url, { user_id, vacation_id });
  }
  getFollowedVacationsByUserId(userId: number): Observable<vacations[]> {
    const url = `${this.baseUrl}/following/${userId}`;
    return this.http.get<vacations[]>(url); // Explicitly define the return type as 'Observable<vacations[]>'
  }
  getAllFollowers() {
    const url = `${this.baseUrl}/getAllFollowers`;
    return this.http.get(url);
  }
  getTotalFollowVac(){
    const url = `${this.baseUrl}/getTotal`;
    return this.http.get(url);
  }
  getFollowersByVacationId(vacation_id: number) {
    const url = `${this.baseUrl}/followed/${vacation_id}`;
    return this.http.get(url);
  }
updateFollow(){
  const url = `${this.baseUrl}/updatefollow`;
  return this.http.put(url, "ok");

}
  deleteFollow(user_id: number, vacation_id: number) {
    const url = `${this.baseUrl}/deleteFollow/${user_id}/${vacation_id}`;
    return this.http.delete(url);
  }
}

