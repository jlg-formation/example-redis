import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
  declarations: [UserComponent, LoginComponent, NewAccountComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
