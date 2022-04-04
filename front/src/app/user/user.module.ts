import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewAccountComponent } from './new-account/new-account.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { AccountCreatedComponent } from './account-created/account-created.component';

@NgModule({
  declarations: [UserComponent, LoginComponent, NewAccountComponent, AccountCreatedComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    WidgetsModule,
  ],
})
export class UserModule {}
