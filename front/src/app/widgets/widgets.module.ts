import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSchemeComponent } from './color-scheme/color-scheme.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordComponent } from './password/password.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ColorSchemeComponent, PasswordComponent, UserStatusComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [ColorSchemeComponent, PasswordComponent, UserStatusComponent],
})
export class WidgetsModule {}
