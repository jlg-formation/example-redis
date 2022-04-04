import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  f = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    displayName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  submit() {}
}
