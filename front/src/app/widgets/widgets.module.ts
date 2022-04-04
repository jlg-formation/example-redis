import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSchemeComponent } from './color-scheme/color-scheme.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [ColorSchemeComponent, PasswordComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ColorSchemeComponent, PasswordComponent],
})
export class WidgetsModule {}
