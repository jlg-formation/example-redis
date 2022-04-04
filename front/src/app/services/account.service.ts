import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

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
