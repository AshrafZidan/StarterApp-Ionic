import { Storage } from '@ionic/storage';
import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject  } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    loading: any ; 
     authState = new BehaviorSubject(false);

constructor(private http: HttpClient , private router: Router , public loadingController: LoadingController , private toastr: ToastController,    private storage: Storage,
  private platform: Platform) { 

    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });

  }

ifLoggedIn() {
  const response = localStorage.getItem('user');
  if (response) {
      this.authState.next(true);
    }
}

  login(user) {
   return this.http.post( environment.backendUrl + '/users/login', user).pipe();
  }

  logout() {
      localStorage.clear();
      this.router.navigate(['login']);
      this.authState.next(false);
  }
register(fullName: string, email: string, password: string) {
    let newUser = {
        name: fullName,
        email: email,
        isAdmin: 0,
        password: password
      }
    return this.http.post( environment.backendUrl + '/users/registerUser', newUser);
   }

   AllNeedsApproval() {
    return this.http.get( environment.backendUrl + '/users/allApproval');

   }
   approveUser(user){
     const userr = {
       id: user.user_id,
       email: user.email
     };
     return this.http.post( environment.backendUrl + '/users/approveUser',userr);

   }
   async presentLoading() {
     this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });

     return  this.loading.present();
  }




  async presentToast(msg) {
    const toast = await this.toastr.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  isAuthenticated() {
    return this.authState.value;
  }

}
