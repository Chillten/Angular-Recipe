import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { RecipeService } from './recipes/recipe.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent
  ],
  providers: [ShoppingListService, RecipeService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
