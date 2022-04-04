import { Component, OnInit } from '@angular/core';
import { Account } from '../interfaces/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [
    {
      displayName: 'JLG',
      email: 'jlguenego@gmail.com',
      id: 'jlguenego',
      identityProvider: 'myself',
      score: 14,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
