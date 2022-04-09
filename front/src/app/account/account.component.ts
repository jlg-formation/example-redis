import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { AccountService } from '../services/account.service';

// set ws protocol when using http and wss when using https
const protocol = window.location.protocol.replace('http', 'ws');
// get location host
const host = window.location.host;
// websocket instantiation

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  errorMessage = '';
  ws = webSocket<{ message: string }>(`${protocol}//${host}/websocket`);

  constructor(public accountService: AccountService) {
    this.ws.asObservable().subscribe((data) => {
      console.log('data: ', data);
    });
    this.ws.next({ message: 'some init message' });
  }

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

  async incrementMyScore() {
    await this.accountService.incrementMyScore();
  }

  sendPing() {
    this.ws.next({ message: 'some message' });
  }
}
