import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/Service/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  dataToSend: any;
  allVacData: any[];


  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAllUserData();
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      user_create: [new Date().toLocaleDateString() + '   ,   ' + new Date().toLocaleTimeString()] 

    });
    console.log(new Date().toLocaleDateString() + ' , ' + new Date().toLocaleTimeString())
  }

  getAllUserData(): void {
    const apiUrl = 'http://localhost:4000/api/user/getAll';
    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        this.allVacData = data;
        //  console.log(this.allVacData);
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    );
  }
  
  onSignUp(): void {
    if 
    (this.signupForm.invalid) {
      return;
    }

    this.dataToSend = {
      user_name: this.signupForm.value.name,
      user_email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      user_create: this.signupForm.value.user_create ,
      role_type: "member" ,

    };

    const emailExists = this.allVacData.some((user) => user.user_email === this.signupForm.value.email);
    if (emailExists) {
      this.signupForm.controls['email'].setErrors([]);
      return;
    } else if (!this.signupForm.controls.email.value && this.signupForm.controls.email.touched) {
      this.signupForm.controls['email'].setErrors([
       
      ]);
      return;
    } else {
      this.signUpService.signUp(this.dataToSend).subscribe(
        (data: any) => {
          alert('User registered successfully');
          const jsonString = JSON.stringify(data);
          localStorage.setItem('user_email', this.dataToSend.user_email);
          this.router.navigate(['/list']);
          localStorage.setItem('userData', jsonString);
          console.log(JSON.stringify(data));
          this.router.navigate(['/list']);
        },
        (error: any) => {
          console.error('Registration failed', error);
        }
      );
            
}}userName(arg0: string, userName: any) {
  throw new Error('Method not implemented.');
}
}
