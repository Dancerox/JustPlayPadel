import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { AngularFirestore, Reference } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

export interface Match { admin: string; date: string, duration: number, playerone: string, playertwo: string, playerthree: string }

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.page.html',
  styleUrls: ['./confirm-booking.page.scss'],
})
export class ConfirmBookingPage implements OnInit {

  date: any;
  time: any;
  duration: any;
  clubName: any;
  uid: any;
  public player: any = {};
  _db: AngularFirestore;
  matches: Observable<any[]>;

  constructor(public alertController: AlertController, public router: Router, private activeRoute: ActivatedRoute, private FirestoreService: FirestoreService, private ngFireAuth: AngularFireAuth, public afs: AngularFirestore) { 
    this.matches = afs.collection('matches').valueChanges();
    this._db = afs;
  }

  ngOnInit() {

    this.date = this.activeRoute.snapshot.paramMap.get('date');
    if (this.date.indexOf('T') > -1)
    {
      this.date = this.date.split('T')[0]; 
    }
    this.time = this.activeRoute.snapshot.paramMap.get('time');
    if (this.time.indexOf('T') > -1)
    {
      this.time = this.time.split('T')[1];
      this.time = this.time.split('.')[0];
      this.time = this.time.split(':')[0] + ":" + this.time.split(':')[1];
    }
    this.duration = this.activeRoute.snapshot.paramMap.get('duration');
    this.clubName = this.activeRoute.snapshot.paramMap.get('clubName');
    console.log(this.date + " " + this.time + " " + this.duration + " " + this.clubName);

    this.ngFireAuth.onAuthStateChanged(user => {
      if(user) {
        this.uid = user.uid;
        console.log("id " + this.uid);
        this.FirestoreService.getPlayer(this.uid).subscribe((clubsSnapshot) => {
          this.player = clubsSnapshot;
          console.log(this.player);
        });
      } else {
       
      }
    });
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Partido creado!',
      message: 'Acceda a mis partidos para ver más',
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

  verPartido() {
    this.uid = "/players/" + this.uid;
    this.date = this.date + "." + this.time;
    let matchesCollection = this._db.collection<Match>('matches');
    matchesCollection.add({ admin: this.uid, date: this.date, duration: this.duration, playerone: "", playertwo: "", playerthree: "" });
    console.log("Partido añadido");
    this.presentAlertMultipleButtons();
    this.router.navigate(['/']);
  }

}
