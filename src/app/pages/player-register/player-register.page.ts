import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface Player { name: string; level: number; }

@Component({
  selector: 'app-player-register',
  templateUrl: './player-register.page.html',
  styleUrls: ['./player-register.page.scss'],
})

export class PlayerRegisterPage implements OnInit {

  _db:AngularFirestore;
  level: any;
  players:  Observable<any[]>;
  uid: any;

  constructor(public ngFireAuth: AngularFireAuth, public afs: AngularFirestore, public FirestoreService: FirestoreService, public router: Router) { 
    this.players = afs.collection('players').valueChanges();
    this._db = afs;
  }

  ngOnInit() {
    this.level = this.FirestoreService.getLevel();

    this.ngFireAuth.onAuthStateChanged(user => {
      if(user) {
        this.uid = user.uid;
        console.log(this.uid);
      } else {
       
      }
    });
  }

  addPlayer(sName: string, dLevel: number){
    let playersCollection = this._db.collection<Player>('players');
    playersCollection.doc(this.uid).set({ name: sName, level: dLevel });
    this.router.navigate(['/']);
  }

}
