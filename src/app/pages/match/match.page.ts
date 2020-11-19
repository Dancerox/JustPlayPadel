import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalChatPage } from '../modal-chat/modal-chat.page';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  uid: any;
  argumentos = null;
  public match: any = {};
  public player: any = {};
  public adminName: any;
  public playerone: any = {};
  public adminId: string;


  constructor(public router: Router, private activeRoute: ActivatedRoute, public alertController: AlertController,  public modalController: ModalController, private ngFireAuth: AngularFireAuth, private FirestoreService: FirestoreService) { }

  ngOnInit() {

    this.argumentos = this.activeRoute.snapshot.paramMap.get('matchId');

    this.ngFireAuth.onAuthStateChanged(user => {
      if(user) {
        this.uid = user.uid;
        console.log("este uid: " + this.uid);

        this.FirestoreService.getMatch(this.argumentos).subscribe((matchsSnapshot) => {
          this.match = matchsSnapshot;
          this.FirestoreService.getPlayerOnly(this.match.admin).subscribe((playersSnapshot) => {
            this.player = playersSnapshot;
          });
          this.FirestoreService.getPlayerOnly(this.match.playerone).subscribe((playersSnapshot) => {
            this.playerone = playersSnapshot;
          });
        });


      } else {
       
      }
    });
  }

  setPlayerone() {
    this.adminId = this.match.admin.split('/')[2];
    if(this.uid != this.adminId) {
      console.log("uid" + this.uid);
      console.log("admin" + this.adminId);
      this.FirestoreService.setPlayeroneToMatch(this.uid, this.argumentos);
      this.userAddToMatch();
      this.router.navigate(['/']);
    } else {
      this.youCantBeAdd();
      console.log("uid" + this.uid);
      console.log("admin" + this.adminId);
    }
  }

  deletePlayerone() {
    this.FirestoreService.deletePlayeroneOfMatch(this.argumentos);
    this.userDeleteFromMatch();
    this.router.navigate(['/']);
  }

  async youCantBeAdd() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡No te puedes añadir!',
      message: 'No puedes añadirte a un partido creado por ti',
      buttons: [{
        text: 'Aceptar',
        role: 'accept',
        handler: data => {
          console.log('Aceptado pulsado');
        }
      
      }]
    });

    await alert.present();
  }

  async presentAlertUserInfo(name: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: name,
      message: 'nivel',
      buttons: [{
        text: 'Aceptar',
        role: 'cancel',
        handler: data => {
          console.log('Accept clicked');
        }
      }]
    });

    await alert.present();
  }

  async presentAlertUserInfoWithDelete(name: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: name,
      message: 'nivel',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Eliminar',
        handler: data => {
          this.deletePlayerone();
       }
      }]
    });

    await alert.present();
  }

  async presentAlertMatchDeleted() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Partido borrado!',
      message: 'Puede volver a crear otro partido si lo desea',
      buttons: [{
        text: 'Aceptar',
        role: 'accept',
        handler: data => {
          console.log('Aceptado pulsado');
        }
      
      }]
    });

    await alert.present();
  }

  async userAddToMatch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Te has añadido al partido!',
      message: 'Puedes añadirte a más partidos',
      buttons: [{
        text: 'Aceptar',
        role: 'accept',
        handler: data => {
          console.log('Aceptado pulsado');
        }
      
      }]
    });

    await alert.present();
  }

  async userDeleteFromMatch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Ya no estás en el partido!',
      message: 'Puedes añadirte a otros partidos',
      buttons: [{
        text: 'Aceptar',
        role: 'accept',
        handler: data => {
          console.log('Aceptado pulsado');
        }
      
      }]
    });

    await alert.present();
  }

  eliminarPartido() {
    this.FirestoreService.deleteMatch(this.argumentos);
    this.presentAlertMatchDeleted();
    this.router.navigate(['/']);
  }

  async MatchInfo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Partido 1',
      message: this.player.name,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Eliminar',
        handler: data => {
          this.eliminarPartido();
       }
      }]
    });

    await alert.present();
  }

  async MatchInfoNoDeleteOption() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Partido 1',
      message: this.player.name,
      buttons: [{
        text: 'Aceptar',
        role: 'cancel',
        handler: data => {
          console.log('Accepted clicked');
        }
      }]
    });

    await alert.present();
  }

  async openChat() {
    const modal = await this.modalController.create({
      component: ModalChatPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
