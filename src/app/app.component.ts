import { Router } from '@angular/router';
import { AuthenticationService } from './Service/auth.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  userInfo: any;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Approval Requests',
      url: '/approve-users',
      icon: 'person-add'
    },
    {
      title: 'Add Restaurant',
      url: '/add-restaurant',
      icon: 'fast-food'
    },
    {
      title: 'Add Menu',
      url: '/add-menu',
      icon: 'grid'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  isLogged = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authServ: AuthenticationService,
    private router: Router,
    private storage: Storage
   ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authServ.authState.subscribe(state => {
      if (state) {
        this.isLogged = true;
        this.userInfo = JSON.parse(localStorage.getItem('user'));
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }
  logOut(){
    this.isLogged = false;
    this.authServ.logout();
  }
}
