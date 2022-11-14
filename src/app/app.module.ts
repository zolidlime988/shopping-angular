import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
import { LoggingService } from './logging.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    // Angular Module
    BrowserModule,
    HttpClientModule,
    // Custom Modules
    AppRoutingModule,
    // Shared
    SharedModule,
    // Provider Module
    CoreModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
