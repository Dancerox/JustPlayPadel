import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  //For filter accordion
  accordionExpanded = false;
  @ViewChild("accordionContentEstadisticas") cardContentEstadisticas: any;

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log(this.cardContentEstadisticas.nativeElement);
    this.renderer.setStyle(this.cardContentEstadisticas.el, "transition", "max-height 500ms, padding 500ms");
  }


  toggleEstadisticas() {
    if(this.accordionExpanded) {
      this.renderer.setStyle(this.cardContentEstadisticas.el, "max-height", "0px");
      this.renderer.setStyle(this.cardContentEstadisticas.el, "padding", "0px 16px");
    } else {
      this.renderer.setStyle(this.cardContentEstadisticas.el, "max-height", "500px");
      this.renderer.setStyle(this.cardContentEstadisticas.el, "padding", "13px 16px");
    }

    this.accordionExpanded = !this.accordionExpanded;
  }

}
