import { Component, OnInit } from '@angular/core';
import { User } from '@jlguenego/angular-tools';

@Component({
  selector: 'app-account-created',
  templateUrl: './account-created.component.html',
  styleUrls: ['./account-created.component.scss'],
})
export class AccountCreatedComponent implements OnInit {
  user: User = {
    displayName: 'Jean-Louis GUENEGO',
    email: 'jlguenego@gmail.com',
    identityProvider: 'example-redis-website',
    id: 'jlguenego',
  };

  constructor() {}

  ngOnInit(): void {}
}
