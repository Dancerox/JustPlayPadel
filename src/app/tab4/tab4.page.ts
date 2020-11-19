import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  //For filter accordion
  accordionExpanded = false;
  @ViewChild("accordionContentFilterMatches") cardContent: any;
  type: string;
  uid: any;
  public matches = [];

  constructor(public renderer: Renderer2, private ngFireAuth: AngularFireAuth, private FirestoreService: FirestoreService, private router: Router) { }

  ngOnInit() {
    this.type = 'matches';

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
          console.log(this.matches);
        });
      } else {
       
      }
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngAfterViewInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setStyle(this.cardContent.el, "transition", "max-height 500ms, padding 500ms");
  }

  toggleAccordionFilterMatches() {
    if(this.accordionExpanded) {
      this.renderer.setStyle(this.cardContent.el, "max-height", "0px");
      this.renderer.setStyle(this.cardContent.el, "padding", "0px 16px");
    } else {
      this.renderer.setStyle(this.cardContent.el, "max-height", "500px");
      this.renderer.setStyle(this.cardContent.el, "padding", "13px 16px");
    }

    this.accordionExpanded = !this.accordionExpanded;
  }

  verPartido(MatchId: null) {
    this.router.navigate(['/match',MatchId]);
  }

}
