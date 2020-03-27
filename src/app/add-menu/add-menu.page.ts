import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Service/auth.service';
import { RestaurantService } from '../Service/restaurant.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.page.html',
  styleUrls: ['./add-menu.page.scss'],
})
export class AddMenuPage implements OnInit {
  submited = false;
  menuForm: FormGroup;
  restaurantList = [];
  constructor(private authSer: AuthenticationService , private router: Router,
              private formBuilder: FormBuilder , private restServ: RestaurantService) { }

  ngOnInit() {
    this.menuForm = this.formBuilder.group({
      name:  ["", Validators.required],
      price: ["", Validators.required],
      restaurantName: ["", Validators.required],
      description: [""],
  });
  this.getAllRest();
  }

  getAllRest(){
    this.authSer.presentLoading();

    this.restServ.getAll().subscribe(
    (data: any) => {
      this.restaurantList = data;
      console.log(this.restaurantList);
      
      this.authSer.dismissLoading();
    }, error => {

      // TODO handle error
      console.log(error);
      this.authSer.presentToast(error.error);
      this.authSer.dismissLoading();
    }
  );

  }
  add(){
    this.submited = true;
    if (this.menuForm.invalid) {
      return;
  }
    this.authSer.presentLoading();    
    this.restServ.addMenu( this.menuForm.value ).subscribe(
    (data: any) => {
      this.menuForm.reset();
      this.authSer.presentToast(data.msg);
      this.authSer.dismissLoading();
    }, error => {

      // TODO handle error
      console.log(error);
      this.authSer.presentToast(error.message);
      this.authSer.dismissLoading();
    }
  );

}
}
