import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Service/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  { path: 'main', loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)},

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },

  {
    path: 'homess',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'approve-users',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./approve-users/approve-users.module').then( m => m.ApproveUsersPageModule)
  },
  {
    path: 'add-restaurant',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./add-restaurant/add-restaurant.module').then( m => m.AddRestaurantPageModule)
  },
  {
    path: 'add-menu',
    canActivate: [AuthenticationGuard],

    loadChildren: () => import('./add-menu/add-menu.module').then( m => m.AddMenuPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
