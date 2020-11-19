import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerRegisterPage } from './player-register.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRegisterPageRoutingModule {}
