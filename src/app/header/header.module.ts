import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TopIconComponent } from './top-icon/top-icon.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, NavMenuComponent, TopIconComponent],
  imports: [CommonModule , SharedModule],
  exports : [HeaderComponent, NavMenuComponent, TopIconComponent]
})
export class HeaderModule {}
