import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public router: Router,
    public app: AppService,
  ) { }

  ngOnInit() {
  }
  ionViewCanEnter() {
    this.app.isProfile().then(
      (data) => {
        if (data) {
          return true
        } else {
          this.router.navigate(['/user/new']);
        }
      }
    );
  }

}
