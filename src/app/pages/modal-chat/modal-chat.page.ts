import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.page.html',
  styleUrls: ['./modal-chat.page.scss'],
})
export class ModalChatPage implements OnInit {

  constructor(private ModalController: ModalController) { }

  ngOnInit() {
  }

  closeChat() {
    this.ModalController.dismiss();
  }

}
