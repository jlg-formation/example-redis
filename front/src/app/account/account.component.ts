import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  errorMessage = '';
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    (async () => {
      try {
        await this.accountService.retrieveAll();
      } catch (err) {
        console.log('err: ', err);
        if (err instanceof Error) {
          this.errorMessage = err.message;
        }
      }
    })();
  }
}
