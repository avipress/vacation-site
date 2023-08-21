import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class MyAuthGuard implements CanActivate {
  constructor(private router: Router,    private loginService: LoginServiceService,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isLoggedIn = localStorage.getItem('user_email');
    
    if (isLoggedIn) {
        this.loginService.userExist = true;
      return true;
    } else {
        this.loginService.userExist = false;
      this.router.navigate(['/login']);
      return false; 
    }
  }
}