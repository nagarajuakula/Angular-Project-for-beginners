import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/serivces/shopping-list.service';
import { CacheInterceptor } from './shared/cache-interceptor';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './Auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    AuthModule,
    ShoppingListModule,
    SharedModule
  ],
  providers: [
              {
                provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
