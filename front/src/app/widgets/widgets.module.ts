import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSchemeComponent } from './color-scheme/color-scheme.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordComponent } from './password/password.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HueSelectorComponent } from './hue-selector/hue-selector.component';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  declarations: [
    ColorSchemeComponent,
    PasswordComponent,
    UserStatusComponent,
    DetailComponent,
    HueSelectorComponent,
    DraggableDirective,
  ],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [
    ColorSchemeComponent,
    PasswordComponent,
    UserStatusComponent,
    DetailComponent,
    HueSelectorComponent,
    DraggableDirective,
  ],
})
export class WidgetsModule {}
