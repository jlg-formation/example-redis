import { Component, OnInit } from '@angular/core';
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit {
  faRightToBracket = faRightToBracket;
  faUser = faUser;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}
}
