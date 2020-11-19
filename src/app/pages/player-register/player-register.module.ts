import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerRegisterPageRoutingModule } from './player-register-routing.module';

import { PlayerRegisterPage } from './player-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerRegisterPageRoutingModule
  ],
  declarations: [PlayerRegisterPage]
})
export class PlayerRegisterPageModule {}
