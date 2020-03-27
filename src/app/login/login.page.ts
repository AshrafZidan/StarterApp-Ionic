import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthenticationService } from './../Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submited = false;
  userForm: FormGroup;
constructor(private authSer: AuthenticationService , private router: Router , private formBuilder: FormBuilder,
            private loading: LoadingController) { 

}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email:  ["", Validators.required],
      password: ["", Validators.required],
  });
  }

  login(){
    this.submited = true;
    if (this.userForm.invalid) {
      return;
  }
    this.authSer.presentLoading().then(() => {

   

    this.authSer.login( this.userForm.value ).subscribe(
    data => {
      this.authSer.authState.next(true);
      localStorage.setItem('user', JSON.stringify(data));
      this.loading.dismiss()
       
      this.router.navigate(['/home']);
    });


    }, error => {
      console.log(error);
      this.authSer.presentToast(error.error);
      this.loading.dismiss()

      
    }
  );
}


  }

