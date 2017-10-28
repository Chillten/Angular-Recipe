import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { reducers } from './core/store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers)
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
