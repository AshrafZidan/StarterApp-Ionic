import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveUsersPage } from './approve-users.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveUsersPageRoutingModule {}
