import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  authProvider: any;
  userData: any;
  userProfile: any;

  constructor(

    public fbAuth: AngularFireAuth,
    public fbStore: AngularFirestore,
    private storage: StorageMap,
    public app: AppService,
    public router: Router,
    public events: EventsService,
  ) { }

  ngOnInit() { }

  async login(provider: 'google') {
    this.fbAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
      this.userData = {
        uid: data.user.uid,
        displayName: data.user.displayName,
        email: data.user.email,
        photoURL: data.user.photoURL,
        provider: provider
      };
      this.storage.set('userData', JSON.stringify(this.userData)).subscribe({
        next: () => {
          this.events.publish('userData', this.userData);
          this.fbStore.firestore.collection('users').doc(this.userData.uid).get()
            .then((data) => {
              if (data.exists) {
                this.userProfile = data.data();
                this.userProfile.uid = data.id;
                this.storage.set('userProfile', JSON.stringify(this.userProfile)).subscribe({
                  next: () => {
                    this.router.navigate(['/user/new']);
                  },
                  error: (error) => { console.error(error); }
                });
              } else {
                this.app.myAlert(
                  `Olá ${this.userData.displayName}`,
                  `Você precisa completar seu cadastro para usar todos os recursos do aplicativo.`
                );
                this.router.navigate(['/user/new']);
              }
            })
            .catch((error) => { console.error(error); });
        },
        error: (error) => { console.error(error); }
      });
    })
      .catch((error) => { console.log(error); });
  }
}