import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {HisptzServicesComponent} from './pages/hisptz-services/hisptz-services.component';
import {ProjectDetailsComponent} from './pages/projects/project-details/project-details.component';
import {ServiceDetailsComponent} from './pages/hisptz-services/service-details/service-details.component';
import {CapacityBuildingComponent} from './pages/capacity-building/capacity-building.component';
import {PhotosComponent} from './pages/photos/photos.component';
import {NewsComponent} from './pages/news/news.component';
import {RecruitmentComponent} from './pages/recruitment/recruitment.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'activities/projects', component: ProjectsComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'services', component: HisptzServicesComponent},
  {path: 'activities/project-details/:id', component: ProjectDetailsComponent},
  {path: 'services/service-details/:id', component: ServiceDetailsComponent},
  {path: 'activities/capacity-building', component: CapacityBuildingComponent},
  {path: 'home/photos', component: PhotosComponent},
  {path: 'news/:id', component: NewsComponent},
  {path: 'recruitment', component: RecruitmentComponent},
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
