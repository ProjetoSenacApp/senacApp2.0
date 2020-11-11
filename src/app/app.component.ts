import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { StorageMap } from '@ngx-pwa/local-storage';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  userData: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: EventsService,
    public storage: StorageMap,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('userData', { type: 'string' }).subscribe({
      next: ((data) => {
        if (data) {
          this.userData = JSON.parse(data);
        }
      })
    });

    this.events.subscribe('userData', (data: any) => {
      this.userData = data;
    });
  }

  ngOnInit() { }

};