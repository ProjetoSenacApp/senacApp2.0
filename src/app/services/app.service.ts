import { Injectable } from '@angular/core';


import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(

    public router: Router, 
    public alertController: AlertController, 
  ) { }

  async myAlert(title: string, text: string) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: [{
        text: 'Ok',
        handler: () => { return true; }
      }]
    });
    await alert.present();
  }
}