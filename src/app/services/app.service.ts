import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(

    public router: Router,
    public alertController: AlertController,
    private storage: StorageMap,
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

  async isProfile() {
    return new Promise<any>((resolve, reject) => {
      this.storage.get('userProfile', { type: 'string' }).subscribe({
        next: (data) => {
          if (data) resolve(true);
          else resolve(false);
        },
        error: (error) => console.error(error)
      });
    });
  }
}