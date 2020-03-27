import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { RestaurantService } from '../Service/restaurant.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  submited = false;
  menuForm: FormGroup;
  public selectedRestaurant = {
    restaurantId: 0,
    name: ''
  } ;
  menuList;
  restaurantList = [];
  userRole = false;

  constructor(private authSer: AuthenticationService , private router: Router,
              private restServ: RestaurantService , private loading: LoadingController) { }

  ngOnInit() {
   this.getAllRest();
   JSON.parse(localStorage.getItem('user')).isAdmin  === 1 ?
    this.userRole = false : this.userRole  = true;
  }

  changeRestaurant(event){
    this.authSer.presentLoading().then(() => {
    this.restServ.changeDefaultRestaurant(event.detail.value).subscribe(
    (data: any) => {
      this.restaurantList = data;
      this.restaurantList.map(rest => {
        rest.isDefault === 1 ? this.selectedRestaurant = rest : " ";
      });
      this.getMenu(this.selectedRestaurant.name);
    });
    }, error => {
      console.log(error);
      this.authSer.presentToast(error.error);
      this.loading.dismiss();
    }
  );

  }

  getAllRest(){
    this.authSer.presentLoading().then(() => {

    this.restServ.getAll().subscribe(
    (data: any) => {
      this.restaurantList = data;
      this.restaurantList.map(rest => {
        rest.isDefault === 1 ? this.selectedRestaurant = rest : '';
      });
      this.getMenu(this.selectedRestaurant.name);
    });
      
    }, error => {
      console.log(error);
      this.authSer.presentToast(error.error);
      this.loading.dismiss()
    }
  );

  }

  getMenu(restaurantName) {
    this.menuList = [];

    this.restServ.getMenuForRestaurant(restaurantName).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.menuList = data;
          this.menuList.forEach(element => {
            element.count = 0;
          });
        }
      this.loading.dismiss()
         
      }, error => {
        // TODO handle error
        console.log(error);
        this.authSer.presentToast(error.error);
        this.loading.dismiss()

      });
  }

  add(menuItem){
    menuItem.count += 1;
  }
  minus(menuItem){
    if (menuItem.count !== 0 ) {
      menuItem.count -= 1;
    }
  }
}
