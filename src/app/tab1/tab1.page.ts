import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from "../shared/authentication-service";
import { FirestoreService } from '../services/firestore/firestore.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  uid: any;
  public player: any = {};

  constructor(public authService: AuthenticationService, public ngFireAuth: AngularFireAuth, private FirestoreService: FirestoreService) {}

  ngOnInit() {
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

}
