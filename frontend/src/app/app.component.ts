import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from './Service/login-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'angular_frontend';
    user_email = '';
    userPass = '';
    myURL = "http://localhost:4000/api/user/checkLogin";
    logged = false;
    isLoggedIn = true;

    constructor(public loginService: LoginServiceService, private router: Router) {
    }
    
    ngOnInit(): void {
      this.loginService.getDataFromLocalStorage();
    }
    
    logout() {
        this.isLoggedIn = false;
    
        localStorage.removeItem('user_email');
        localStorage.removeItem('userData'); 
    
        this.router.navigate(['/login']); 
      }
    onUserChange(event: any) {
        this.user_email = event.target.value;
    }
    
    onPassChange(event: any) {
        this.userPass = event.target.value;
    }
    
    onMakeLogin() {
        console.log("user: ", this.user_email);
        console.log("pass: ", this.userPass);
        try {
            this.loginService.login(this.user_email, this.userPass).subscribe(data => console.log("working :)"), err => console.log("why who are you???? ", err));
        } catch (err) {
            console.log("error" ,err);
        }
    
    }
    logoutAfterInit() {
        this.logout();
      }
}
