import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service/auth.service';

@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.page.html',
  styleUrls: ['./approve-users.page.scss'],
})
export class ApproveUsersPage implements OnInit {
  users = [] ;
  constructor(private authSer: AuthenticationService) { }

  ngOnInit() {
    this.ListNeedsapproval();
  }

  ListNeedsapproval(){
    this.authSer.presentLoading();
    this.authSer.AllNeedsApproval().subscribe((data:[]) => {
      this.users = data;
      this.authSer.dismissLoading();
    },err=> {
      console.log(err);
      this.authSer.presentToast(err.error);
    });
  }
  approveUser(user){
    this.authSer.presentLoading();
    this.authSer.approveUser(user).subscribe((data: any) => {
      this.authSer.presentToast(data.msg);
      this.authSer.dismissLoading();
      this.ListNeedsapproval()
    },err=> {
      console.log(err);
      this.authSer.presentToast(err.error);
    });
  }

}
