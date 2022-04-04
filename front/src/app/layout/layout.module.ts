import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BodyComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule, WidgetsModule],
  exports: [HeaderComponent, FooterComponent, BodyComponent],
})
export class LayoutModule {}
