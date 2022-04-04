import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/interfaces/credentials';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  f = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage = '';

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  async submit() {
    this.errorMessage = '';
    try {
      await this.accountService.login(this.f.value as Credentials);
      await this.router.navigateByUrl(this.accountService.afterLoginRoute);
      this.accountService.afterLoginRoute = '/';
    } catch (err) {
      console.log('err: ', err);
      if (err instanceof Error) {
        this.errorMessage = err.message;
      }
    }
  }
}
