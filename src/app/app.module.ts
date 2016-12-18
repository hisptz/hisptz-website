import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AppRoutingModule} from "./app.routing.module";
import { HomeComponent } from './home/home.component';
import { NavbarHomeComponent } from './home/navbar-home/navbar-home.component';
import { LandingComponent } from './home/landing/landing.component';
import { PartnersComponent } from './home/partners/partners.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NavbarComponent,
    NavbarHomeComponent,
    LandingComponent,
    PartnersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
