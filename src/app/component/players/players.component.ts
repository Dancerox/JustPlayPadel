import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {

  public players = [];

  constructor(private FirestoreService: FirestoreService) { }

  ngOnInit() {
    this.FirestoreService.getPlayers().subscribe((playersSnapshot) => {
      this.players = [];
      playersSnapshot.forEach((playerData: any) => {
        this.players.push({
          id: playerData.payload.doc.id,
          data: playerData.payload.doc.data()
        });
      })
    });
  }

}
