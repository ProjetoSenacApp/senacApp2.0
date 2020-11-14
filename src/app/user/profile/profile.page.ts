import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;
  userProfile: any;

  constructor(
    public router: Router,
    public app: AppService,
    public storage: StorageMap,
  ) { }

  ngOnInit() {
  }
  ionViewCanEnter() {
    this.app.isProfile().then(
      (data) => {
        if (data) {
          this.storage.get('userData', { type: 'string' }).subscribe((data) => {
            this.userData = JSON.parse(data);
            this.storage.get('userProfile', { type: 'string' }).subscribe((data) => {
              this.userProfile = JSON.parse(data);
            });
          });
        } else {
          this.router.navigate(['/user/new']);
        }
      });
  }
  editProviderProfile() {
    let profileURL = '';
    switch (this.userData.provider) {

      case 'google':
        profileURL = 'https://myaccount.google.com/profile';
        break;
    }
    if (this.app.myAlert(this.userData.displayName, `Atenção! Você será redirecionado para a página de perfil no provedor`)) {
      window.open(profileURL);
    }
  }
}
