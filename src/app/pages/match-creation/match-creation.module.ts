import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchCreationPageRoutingModule } from './match-creation-routing.module';

import { MatchCreationPage } from './match-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchCreationPageRoutingModule
  ],
  declarations: [MatchCreationPage]
})
export class MatchCreationPageModule {}
