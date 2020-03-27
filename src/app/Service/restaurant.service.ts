import { environment } from './../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

constructor(private http: HttpClient , private router: Router) {
  }

  addRestaurant(rest){
   return this.http.post(environment.backendUrl + '/restaurant/add', rest);
  }

  getAll(){
   return this.http.get(environment.backendUrl + '/restaurant/getAll');

  }
  addMenu(menu){
    return this.http.post(environment.backendUrl + '/product/add', menu);

  }
  getMenuForRestaurant(restaurantName){
    return this.http.post(environment.backendUrl + '/product/getAll', {'restaurantName': restaurantName} );

  }
  changeDefaultRestaurant(newRestaurant){
    return this.http.get(environment.backendUrl + '/restaurant/changeDefault/' + newRestaurant);

  }


}
