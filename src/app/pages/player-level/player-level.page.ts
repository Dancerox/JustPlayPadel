import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-level',
  templateUrl: './player-level.page.html',
  styleUrls: ['./player-level.page.scss'],
})
export class PlayerLevelPage implements OnInit {

  data1: number;
  data2: number;
  data3: number;
  total: number;

  constructor(private FirestoreService: FirestoreService, private router: Router) { }

  ngOnInit() {
  }

  public ConvertToInt(val){
    return parseFloat(val);
  }

  calcularNivel() {
    this.total = this.ConvertToInt(this.data1) + this.ConvertToInt(this.data2) + this.ConvertToInt(this.data3);
    this.FirestoreService.setLevel(this.total);
    this.router.navigate(['/player-register']);
  }

  

}
