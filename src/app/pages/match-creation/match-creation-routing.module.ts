import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchCreationPage } from './match-creation.page';

const routes: Routes = [
  {
    path: '',
    component: MatchCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchCreationPageRoutingModule {}
