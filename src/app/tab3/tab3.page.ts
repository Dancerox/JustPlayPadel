import { Component, ViewChild, Renderer2, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';

import { FirestoreService } from '../services/firestore/firestore.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  type: string;
  duration: number = 0;
  public players = [];
  public clubs = [];
  public clubsBackup = [];
  public clubItem = null;

  date: any;
  time: any;
  price: any = 10;
  stars: any = 5;


  //For filter accordion
  accordionExpanded = false;
  @ViewChild("accordionContent") cardContent: any;

  constructor(private firestore: AngularFirestore, public renderer: Renderer2, private FirestoreService: FirestoreService, private navCtrl:NavController,
    private router: Router, private ngFireAuth: AngularFireAuth ) {

  }

  ngOnInit() {

    this.ngFireAuth.onAuthStateChanged(user => {
      if(user) {
        console.log("Usuario logueado");
        this.router.navigate(['/']);
      } else {
        console.log("Usuario no logueado");
        this.router.navigate(['/login']);
      }
    });

    this.type = 'hour';

    this.FirestoreService.getPlayers().subscribe((playersSnapshot) => {
      this.players = [];
      playersSnapshot.forEach((playerData: any) => {
        this.players.push({
          id: playerData.payload.doc.id,
          data: playerData.payload.doc.data()
        });
      })
    });

    this.FirestoreService.getClubs().subscribe((clubsSnapshot) => {
      this.clubs = [];
      clubsSnapshot.forEach((clubData: any) => {
        this.clubs.push({
          id: clubData.payload.doc.id,
          data: clubData.payload.doc.data()
        });
      })
      this.clubsBackup = this.clubs;
    });


  }

  ngAfterViewInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setStyle(this.cardContent.el, "transition", "max-height 500ms, padding 500ms");
    
  }

  async filterList(evt) {
    this.clubs = this.clubsBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.clubs = this.clubs.filter(currentClubs => {
      if (currentClubs.data.name && searchTerm) {
        return (currentClubs.data.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  toggleAccordion() {
    if(this.accordionExpanded) {
      this.renderer.setStyle(this.cardContent.el, "max-height", "0px");
      this.renderer.setStyle(this.cardContent.el, "padding", "0px 16px");
    } else {
      this.renderer.setStyle(this.cardContent.el, "max-height", "500px");
      this.renderer.setStyle(this.cardContent.el, "padding", "13px 16px");
    }

    this.accordionExpanded = !this.accordionExpanded;
  }

  verClub(ClubId: null) {
    this.router.navigate(['/match-creation',ClubId]);
    console.log(this.date);
  }

  validateDate() {
    this.FirestoreService.setDate(this.date.split('T')[0]);
  }

  validateTime() {
    this.FirestoreService.setTime(this.time.split('T')[1]);
  }

  validatePrice() {
    this.price = this.price;
  }

  validateStars() {
    this.stars = this.stars;
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
  } 

}
