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
import { SafePipe } from './shared/pipes/safe.pipe';
import { TeamComponent } from './team/team.component';
import {TeamService} from "./providers/team.service";
import { TeamMemberComponent } from './team-member/team-member.component';
import {TabsModule} from 'ng2-bootstrap/tabs';
import { MemberEducationComponent } from './member-education/member-education.component';
import { MemberExperienceComponent } from './member-experience/member-experience.component';
import { MemberConsultancyComponent } from './member-consultancy/member-consultancy.component';
import {TeamEducationService} from "./providers/team-education.service";
import {TeamExperienceService} from "./providers/team-experience.service";
import {TeamConsultancyService} from "./providers/team-consultancy.service";
import { ActivitiesComponent } from './home/activities/activities.component';
import { PapersComponent } from './papers/papers.component';
import {PaperService} from "./providers/paper.service";
import { ProjectsComponent } from './projects/projects.component';
import {ProjectService} from "./providers/projects.service";
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import {PartnerService} from "./providers/partners.service";
import { FeaturedProductComponent } from './home/featured-product/featured-product.component';

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
    ProductDetailsComponent,
    SafePipe,
    TeamComponent,
    TeamMemberComponent,
    MemberEducationComponent,
    MemberExperienceComponent,
    MemberConsultancyComponent,
    ActivitiesComponent,
    PapersComponent,
    ProjectsComponent,
    TruncatePipe,
    ProjectDetailComponent,
    AboutUsComponent,
    FaqsComponent,
    FeaturedProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TabsModule
  ],
  providers: [
      ProductService,
      TeamService,
      TeamEducationService,
      TeamExperienceService,
      TeamConsultancyService,
      PaperService,
      ProjectService,
      PartnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
