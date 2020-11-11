import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userData: any;
  constructor(
    private sotorage: StorageMap,
  ) { }

  ngOnInit() {

    this.sotorage.get('userData', { type: 'string' }).subscribe(
      (data) => {
        if (data) this.userData = JSON.parse(data);
        console.log(data)
      }
    );
  }
}
