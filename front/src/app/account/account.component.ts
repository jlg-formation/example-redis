import { Component, OnDestroy, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WebsocketMessage } from '../interfaces/websocket-message';
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
export class AccountComponent implements OnInit, OnDestroy {
  errorMessage = '';
  ws: WebSocketSubject<WebsocketMessage<unknown>> = webSocket<
    WebsocketMessage<unknown>
  >(`${protocol}//${host}/websocket`);

  constructor(public accountService: AccountService) {
    this.ws.subscribe((data) => {
      console.log('data: ', data);
    });
    this.ws.next({ data: 'some init message' });
  }

  async incrementMyScore() {
    await this.accountService.incrementMyScore();
  }

  ngOnDestroy(): void {
    this.ws.unsubscribe();
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

  sendPing() {
    this.ws.next({ data: 'some message' });
  }
}
