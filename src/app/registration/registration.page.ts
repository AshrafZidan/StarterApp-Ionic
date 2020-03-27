import { Router } from '@angular/router';
import { AuthenticationService } from './../Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
   submited = false;
  userForm: FormGroup;

  constructor(private authSer: AuthenticationService, private router: Router , private formBuilder: FormBuilder) { 
   }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fullName: ["", Validators.compose([Validators.required , Validators.minLength(2), Validators.maxLength(30)])],

      email:  ["", Validators.compose([Validators.required , Validators.pattern('^[a-zA-Z0-9_.+-]+@((asset)).com.eg$')  ]), ],
      password: ["", Validators.required],
  });
  }

  register(){
    this.submited = true;
    if (this.userForm.invalid) {
      return;
  }
    this.authSer.presentLoading();

    this.authSer.register( this.userForm.get('fullName').value ,this.userForm.get('email').value.trim(), this.userForm.get('password').value).subscribe(
    data => {
      this.authSer.presentToast('Done');
      this.authSer.dismissLoading();
      this.router.navigate(['/login']);
    }, error => {

      // TODO handle error
      console.log(error);
      this.authSer.presentToast(error.error.message);
      this.authSer.dismissLoading();
    }
  );
}

}
