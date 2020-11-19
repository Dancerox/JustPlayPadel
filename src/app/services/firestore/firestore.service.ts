import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { read } from 'fs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  date: any;
  time: any;
  level: any;
  lowerPrice: any;
  upperPrice: any;
  
  constructor(private firestore: AngularFirestore) { }


  // Players methods

  public createPlayer(data: {level: number, name: string}) {
    return this.firestore.collection('players').add(data);
  }

  public getPlayers() {
    return this.firestore.collection('players').snapshotChanges();
  }

  public getMatches() {
    return this.firestore.collection('matches').snapshotChanges();
  }

  // Clubs methods
  public getClubs() {
    return this.firestore.collection('clubs').snapshotChanges();
  }

  public getClub(id: string) {
    return this.firestore.doc('clubs/' + id).valueChanges();
  }


  public getMatch(id: string) {
    return this.firestore.doc('matches/' + id).valueChanges();
  }

  // Courts methods
  public getCourts() {
    return this.firestore.collection('courts').snapshotChanges();
  }

  setDate(date) {
      this.date = date;
  }

  setTime(time) {
    this.time = time;
  }

  setPrice(price) {
    this.lowerPrice = price.lower;
    this.upperPrice = price.upper;
  }

  public getPlayerOnly(id: string) {
    console.log(id + " llegue");
    return this.firestore.doc(id).valueChanges();
  }

  public getPlayer(id: string) {
    console.log(id + " llegue");
    return this.firestore.doc('players/' + id).valueChanges();
  }

  public deleteMatch(id: string) {
    return this.firestore.doc('matches/' + id).delete();
  }

  public setPlayeroneToMatch(idPlayer: string, idMatch: string )  {
    return this.firestore.doc('matches/' + idMatch).update({
      playerone: '/players/' + idPlayer
    });
  }

  public deletePlayeroneOfMatch(idMatch: string ) {
    return this.firestore.doc('matches/' + idMatch).update({
      playerone: ''
    });
  }

  getDate(){
      return this.date;
  }

  getTime() {
    return this.time;
  }

  setLevel(level) {
    this.level = level;
  }

  getLevel() {
    return this.level;
  }

}
