import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { StorageMap } from '@ngx-pwa/local-storage';


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  userData: any;
  constructor(
    public app: AppService,
    private storage: StorageMap,
  ) { }

  ngOnInit() {
    this.storage.get('userData', { type: 'string' }).subscribe(
      (data) => {
        this.userData = JSON.parse(data);
      }
    );
  }
}
