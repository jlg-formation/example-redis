import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSchemeComponent } from './color-scheme/color-scheme.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ColorSchemeComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ColorSchemeComponent],
})
export class WidgetsModule {}
