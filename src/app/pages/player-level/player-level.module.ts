import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerLevelPageRoutingModule } from './player-level-routing.module';

import { PlayerLevelPage } from './player-level.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerLevelPageRoutingModule
  ],
  declarations: [PlayerLevelPage]
})
export class PlayerLevelPageModule {}
