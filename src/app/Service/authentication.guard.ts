import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public authenticationService: AuthenticationService    ) { }

  canActivate()
    {
  //   // if (localStorage.getItem('currentUser')) {
  //   if (localStorage.getItem('user')) {
  //     // logged in so return true
  //     if (this.router.ge) {
        
  //     }
  //     this.router.navigate(['/home']);
  //     console.log("***** success");
  //     return true;
  //   } else {
  //     console.log("***** fail");
  //     // not logged in so redirect to login page with the return url
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
  return this.authenticationService.isAuthenticated();

}

}