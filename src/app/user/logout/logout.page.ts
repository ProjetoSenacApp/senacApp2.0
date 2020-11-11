import { Component, OnInit } from '@angular/core';

// 3.1) Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(

    public fbAuth: AngularFireAuth,
    private storage: StorageMap,
    private router: Router,
    public events: EventsService,
  ) { }

  ngOnInit() { }

  logout() {
    this.fbAuth.signOut()
      .then(() => {

        this.storage.delete('userProfile').subscribe({
          next: (() => {
            this.storage.delete('userData').subscribe({
              next: (() => {
                this.events.publish('userData', null);
                this.router.navigate(['/']);
              }),
              error: ((error) => { console.error(error); })
            });
          }),
          error: ((error) => { console.error(error); })
        });
      })
      .catch((error) => { console.error(error); });
  }
}