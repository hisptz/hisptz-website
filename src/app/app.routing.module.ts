import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {TeamComponent} from "./team/team.component";
import {TeamMemberComponent} from "./team-member/team-member.component";
import {MemberEducationComponent} from "./member-education/member-education.component";
import {MemberExperienceComponent} from "./member-experience/member-experience.component";
import {MemberConsultancyComponent} from "./member-consultancy/member-consultancy.component";

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  {path: 'products', component: ProductsComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'team', component: TeamComponent},
  {path: 'team-member/:id', component: TeamMemberComponent, children: [
    {path: '',  component: MemberEducationComponent},
    {path: 'experience', component: MemberExperienceComponent},
    {path: 'consultancy', component: MemberConsultancyComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
