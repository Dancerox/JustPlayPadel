import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selection: string;
  public matches = [];
  uid: any;
  public matchPlayers = {};

  constructor(private FirestoreService: FirestoreService, private ngFireAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.selection = 'created';


    this.ngFireAuth.onAuthStateChanged(user => {
      if(user) {
        this.uid = user.uid;
        console.log("id " + this.uid);
        this.FirestoreService.getMatches().subscribe((playersSnapshot) => {
          this.matches = [];
          playersSnapshot.forEach((matchData: any) => {
            this.matches.push({
              id: matchData.payload.doc.id,
              data: matchData.payload.doc.data()
            });
          })
        });
      } else {
       
      }
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log(this.matches);
  }

  verPartido(MatchId: null) {
    this.router.navigate(['/match',MatchId]);
    console.log("llego");
  }

}
