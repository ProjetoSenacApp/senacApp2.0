import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  userData: any;
  select01Data: any;

  constructor(
    private storage: StorageMap,
    private formBuilder: FormBuilder,
    public router: Router,
    public fbStore: AngularFirestore,

  ) {
    this.storage.get('userData', { type: 'string' }).subscribe((data) => {
      if (!data) { this.router.navigate(['/']); }
      this.userData = JSON.parse(data);
      this.select01Data = this.fbStore.collection('select01', ref => ref.orderBy('option')).valueChanges();
      this.profileFormCreate();
    });
  }

  ngOnInit() { }

  profileFormCreate() {
    this.profileForm = this.formBuilder.group({
      id: [
        this.userData.uid
      ],
      name: [
        this.userData.displayName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
      ],
      cpf: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\b\d{11}\b/g)
        ])
      ],
      email: [
        this.userData.email,
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      homePhone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|8[1-9])[0-9]{3}\-?[0-9]{4}$/)
        ])
      ],
      cellPhone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/)
        ])
      ],
      whatsApp: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/)
        ])
      ],
      selectStatic: [
        'opção 2',
        Validators.compose([
          Validators.required
        ])
      ],
      selectDynamic: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      type: ['user'],
      status: ['active']
    });
  }

  profileSubmit() {
    console.log('foi')
  }

  over14Years(control: AbstractControl) {
    const birth = control.value;
    if (birth) {
      const [year, month, day] = birth.split('-');
      const today = new Date();
      const dateBirth = new Date(year, month, day, 0, 0, 0);
      const timeToTest = 1000 * 60 * 60 * 24 * 365 * 14;
      if (today.getTime() - dateBirth.getTime() >= timeToTest) { return null; }
    }
    return { under14years: true };
  }
}
