import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveUsersPageRoutingModule } from './approve-users-routing.module';

import { ApproveUsersPage } from './approve-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveUsersPageRoutingModule
  ],
  declarations: [ApproveUsersPage]
})
export class ApproveUsersPageModule {}
