
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LoginServiceService } from '../../Service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'angular_frontend';
  user_email = '';
  userPass = '';
  myURL = "http://localhost:4000/api/user/checkLogin";
  logged = false;
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loginService.userExist = false
    this.loginForm = this.formBuilder.group({
      user_email: ['', Validators.required],
      userPass: ['', [ Validators.required, Validators.minLength(4)]],
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }
  onUserChange(event: any) {
    this.user_email = event.target.value;
  }
  onPassChange(event: any) {
    this.userPass = event.target.value;
  }
  onMakeLogin() {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.user_email = this.formControls.user_email.value;
    this.userPass = this.formControls.userPass.value;

    this.loginService.login(this.user_email, this.userPass).subscribe(
      (data: any[]) => {
        if (data.length > 0) {   
          console.log("you are logged in", this.user_email);
          const jsonString = JSON.stringify(data[0]);
          localStorage.setItem('user_email', this.user_email);
          localStorage.setItem('userData', jsonString);
          console.log(JSON.stringify(data[0]));
          this.router.navigate(['/list']);
        } else {
          this.errorMessage = 'name or password User not correct.';
        }
      },
      (error: any) => {
        console.log("error");
        this.errorMessage = 'An error occurred while checking the credentials.';
      }
    );
  }
}
