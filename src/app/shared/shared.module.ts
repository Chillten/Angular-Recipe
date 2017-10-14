import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule
  ],
  exports: [
    DropdownDirective
  ],
  declarations: [
    DropdownDirective
  ]
})
export class SharedModule { }
