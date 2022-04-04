import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountForm } from 'src/app/interfaces/account-form';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  errorMessage = '';
  f = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    displayName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  async submit() {
    this.errorMessage = '';
    try {
      await this.accountService.create(this.f.value as AccountForm);
      await this.router.navigate(['../account-created'], {
        relativeTo: this.route,
      });
    } catch (err) {
      if (err instanceof Error) {
        this.errorMessage = err.message;
        return;
      }
      this.errorMessage = 'technical error.';
    }
  }
}
