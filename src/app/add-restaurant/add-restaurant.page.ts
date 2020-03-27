import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { RestaurantService } from '../Service/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {
  submited = false;
  restaurantForm: FormGroup;
  constructor(private authSer: AuthenticationService , private router: Router , private formBuilder: FormBuilder , private restServ: RestaurantService) { }

  ngOnInit() {
    this.restaurantForm = this.formBuilder.group({
      name:  ["", Validators.required],
      phone: ["", Validators.required],
      delivery_cost: ["", Validators.required],
      location: [""],
  });
  }

  add(){
    this.submited = true;
    if (this.restaurantForm.invalid) {
      return;
  }
    this.authSer.presentLoading();

    this.restServ.addRestaurant( this.restaurantForm.value ).subscribe(
    (data: any) => {
      this.restaurantForm.reset();
      this.authSer.presentToast(data.msg);
      this.authSer.dismissLoading();
    }, error => {

      // TODO handle error
      console.log(error);
      this.authSer.presentToast(error.error);
      this.authSer.dismissLoading();
    }
  );
}


}
