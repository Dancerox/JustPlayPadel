import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerLevelPage } from './player-level.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerLevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerLevelPageRoutingModule {}
