import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom } from 'rxjs';
import { Account } from '../interfaces/account';
import { AccountForm } from '../interfaces/account-form';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  account$ = new BehaviorSubject<Account | undefined>(undefined);
  constructor(private http: HttpClient) {}

  async create(accountForm: AccountForm) {
    const account = await lastValueFrom(
      this.http.post<Account>('/api/account', accountForm).pipe(
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof HttpErrorResponse) {
            if (err.error?.error) {
              throw new Error(err.error?.error);
            }
          }
          throw new Error('oups. bad creation');
        })
      )
    );
    this.account$.next(account);
  }

  async login(credentials: Credentials) {
    await lastValueFrom(
      this.http.post('/api/account/login', credentials).pipe(
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof HttpErrorResponse) {
            if (err.error?.error) {
              throw new Error(err.error?.error);
            }
          }
          throw new Error('oups. bad login');
        })
      )
    );
  }
}
