import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { database } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { IfStmt } from '@angular/compiler';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-match-creation',
  templateUrl: './match-creation.page.html',
  styleUrls: ['./match-creation.page.scss'],
})
export class MatchCreationPage implements OnInit {

  duration: number = 0;
  value: any;
  public club: any = {};
  public courts: any = [];
  date: any;
  time: any;
  uid: any;
  public player: any = {};
  user: any;
  values: any = [];

  argumentos = null;

  constructor(public ngFireAuth: AngularFireAuth, public renderer: Renderer2, public location: Location, private activeRoute: ActivatedRoute, private FirestoreService: FirestoreService, public router: Router) { 
  }

  ngOnInit() {
    
    this.argumentos = this.activeRoute.snapshot.paramMap.get('clubId');

    this.FirestoreService.getClub(this.argumentos).subscribe((clubsSnapshot) => {
      this.club = clubsSnapshot;
    });

    this.FirestoreService.getCourts().subscribe((courtsSnapshot) => {
      this.courts;
      courtsSnapshot.forEach((courtData: any) => {
        this.courts.push({
          id: courtData.payload.doc.id,
          data: courtData.payload.doc.data()
        });
      })
    });

    this.date = this.FirestoreService.getDate(); 
    this.time = this.FirestoreService.getTime();

    this.validateDate();
    this.validateTime();

    console.log(this.date);
    console.log(this.time);


  }

  increment() {
    if(this.duration < 0) {
      this.duration = 0;
    } else {
      this.duration += 30;
    }
    console.log(this.courts[1].data.bookings);
  }

  decrement() {
    if(this.duration <= 0) {
      this.duration = 0;
    } else {
      this.duration -= 30;
    }
    console.log(this.values);
  }

  validateDate() {
    this.FirestoreService.setDate(this.date.split('T')[0]);
  }

  validateTime() {
    this.FirestoreService.setTime(this.time.split('T')[1]);
    this.time = this.time.split('.')[0];
    this.time = this.time.split(':')[0] + ":" + this.time.split(':')[1];
    this.FirestoreService.setTime(this.time);
  }

  verReserva() {
    this.router.navigate(['/confirm-booking',this.date,this.time,this.duration,this.club.name], { skipLocationChange: true });
  }
}
