import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonCardContent } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  accordionExpanded = false;
  @ViewChild("accordionContent") cardContent: any;

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setStyle(this.cardContent.el, "transition", "max-height 500ms, padding 500ms");
  }

  constructor(public renderer: Renderer2) { }

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

}
