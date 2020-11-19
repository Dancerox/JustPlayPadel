import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal-chat',
    loadChildren: () => import('./pages/modal-chat/modal-chat.module').then( m => m.ModalChatPageModule)
  },
  {
    path: 'match-creation/:clubId',
    loadChildren: () => import('./pages/match-creation/match-creation.module').then( m => m.MatchCreationPageModule)
  },
  {
    path: 'confirm-booking/:date/:time/:duration/:clubName',
    loadChildren: () => import('./pages/confirm-booking/confirm-booking.module').then( m => m.ConfirmBookingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'match/:matchId',
    loadChildren: () => import('./pages/match/match.module').then( m => m.MatchPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'player-level',
    loadChildren: () => import('./pages/player-level/player-level.module').then( m => m.PlayerLevelPageModule)
  },
  {
    path: 'player-register',
    loadChildren: () => import('./pages/player-register/player-register.module').then( m => m.PlayerRegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
