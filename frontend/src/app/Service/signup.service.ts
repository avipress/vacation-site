import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private myURL = "http://localhost:4000/api/user/signup";

  constructor(private http: HttpClient) {}
  getEmail(userId: number) {
    const url = '/api/user/getEmail';
    const params = {
      userId: userId
    };
    return this.http.get(url, {params});
  }
  signUp(data: User): Observable<any> {
    return this.http.post(this.myURL, data);
  }
}
