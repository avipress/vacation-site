import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginServiceService {
   
    userExist = false;
    [x: string]: any;
    myURL = "http://localhost:4000/api/user/checkLogin";
    data = "";

    constructor(private http: HttpClient) { }

    getDataFromLocalStorage(): void {
        const data = localStorage.getItem('user_email');
        if (data) {
          this.userExist = true;
        } else {
            this.userExist = false;
        }
      }

    login(user_email: string, password: string): Observable<any> {
        const data = {
            "user_email": user_email,
            "password": password
        };

        return this.http.post(this.myURL, data);



    }
}
