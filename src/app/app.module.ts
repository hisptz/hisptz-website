import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import { HomeComponent } from './home/home.component';
import { NavbarHomeComponent } from './home/navbar-home/navbar-home.component';
import { LandingComponent } from './home/landing/landing.component';
import { PartnersComponent } from './home/partners/partners.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {ProductService} from "./providers/product.service";
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavbarHomeComponent,
    LandingComponent,
    PartnersComponent,
    FooterComponent,
    ProductsComponent,
    NavbarComponent,
    ProductCardComponent,
    LoaderComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
