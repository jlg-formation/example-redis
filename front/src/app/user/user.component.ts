import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorSchemeService } from '@jlguenego/angular-tools';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  hue = new FormControl(this.getHue());
  constructor(
    public accountService: AccountService,
    public colorSchemeService: ColorSchemeService,
    private router: Router
  ) {
    this.hue.valueChanges.subscribe((hue) => {
      this.colorSchemeService.updateHue(+hue);
    });
  }

  ngOnInit(): void {}

  getHue() {
    return this.colorSchemeService.hue$.value;
  }

  async logout() {
    console.log('about to logout');
    await this.accountService.logout();
    await this.router.navigateByUrl('/');
  }
}
