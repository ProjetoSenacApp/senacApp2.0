import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userData: any;
  constructor(
    private sotorage: StorageMap,
    public router: Router,
    public app: AppService,
  ) { }

  ngOnInit() {

    this.sotorage.get('userData', { type: 'string' }).subscribe(
      (data) => {
        if (data) this.userData = JSON.parse(data);
        console.log(data)
      }
    );
  }

  ionViewWillEnter() {
    this.app.isProfile().then(
      (data) => {
        if (data) {
          return true
        } else {
          this.router.navigate(['/user/new']);
        }
      });
  }
}
