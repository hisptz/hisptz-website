import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LandingComponent } from './pages/home/components/landing/landing.component';
import { ServicesComponent } from './pages/home/components/services/services.component';
import { TrendingProductsComponent } from './pages/home/components/trending-products/trending-products.component';
import {ProductsService} from './providers/products.service';
import {HttpClientModule} from '@angular/common/http';
import {ProjectsService} from './providers/projects.service';
import { TrendingProjectsComponent } from './pages/home/components/trending-projects/trending-projects.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import {ServicesService} from './providers/services.service';
import { HisptzServicesComponent } from './pages/hisptz-services/hisptz-services.component';
import { ProjectDetailsComponent } from './pages/projects/project-details/project-details.component';
import { ServiceDetailsComponent } from './pages/hisptz-services/service-details/service-details.component';
import { CapacityBuildingComponent } from './pages/capacity-building/capacity-building.component';
import {CapacityBuildingService} from './providers/capacity-building.service';
import { PhotosComponent } from './pages/photos/photos.component';
import {PhotosService} from './providers/photos.service';
import { FooterComponent } from './shared/footer/footer.component';
import { PartnersComponent } from './pages/home/components/partners/partners.component';
import {PartnersService} from './providers/partners.service';
import { NewsComponent } from './pages/news/news.component';
import { FeaturedNewsComponent } from './pages/home/components/featured-news/featured-news.component';
import { SliderPhotosComponent } from './pages/photos/slider-photos/slider-photos.component';
import { PhotosSummaryComponent } from './pages/home/components/photos-summary/photos-summary.component';
import {NewsService} from './providers/news.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LandingComponent,
    ServicesComponent,
    TrendingProductsComponent,
    TrendingProjectsComponent,
    ProjectsComponent,
    AboutUsComponent,
    HisptzServicesComponent,
    ProjectDetailsComponent,
    ServiceDetailsComponent,
    CapacityBuildingComponent,
    PhotosComponent,
    FooterComponent,
    PartnersComponent,
    NewsComponent,
    FeaturedNewsComponent,
    SliderPhotosComponent,
    PhotosSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ProductsService, ProjectsService, ServicesService, CapacityBuildingService, PhotosService, PartnersService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
