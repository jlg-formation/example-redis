import { Component, OnInit } from '@angular/core';
import { User } from '@jlguenego/angular-tools';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-created',
  templateUrl: './account-created.component.html',
  styleUrls: ['./account-created.component.scss'],
})
export class AccountCreatedComponent implements OnInit {
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
}
