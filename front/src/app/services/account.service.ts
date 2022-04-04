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
  accounts$ = new BehaviorSubject<Account[]>([]);

  constructor(private http: HttpClient) {
    this.checkConnection();
  }

  async checkConnection() {
    try {
      const account = await lastValueFrom(
        this.http.get<Account>('/api/account/is-logged')
      );
      this.account$.next(account);
    } catch (err) {
      console.log('err: ', err);
      this.account$.next(undefined);
    }
  }

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

  async logout() {
    await lastValueFrom(
      this.http.post('/api/account/logout', undefined).pipe(
        catchError((err) => {
          console.log('err: ', err);
          if (err instanceof HttpErrorResponse) {
            if (err.error?.error) {
              throw new Error(err.error?.error);
            }
          }
          throw new Error('oups. bad logout');
        })
      )
    );
    this.account$.next(undefined);
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

  async retrieveAll() {
    const accounts = await lastValueFrom(
      this.http.get<Account[]>('/api/account')
    );
    this.accounts$.next(accounts);
  }
}
