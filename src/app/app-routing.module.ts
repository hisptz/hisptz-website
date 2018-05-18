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

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'services', component: HisptzServicesComponent},
  {path: 'project-details/:id', component: ProjectDetailsComponent},
  {path: 'service-details/:id', component: ServiceDetailsComponent},
  {path: 'capacity-building', component: CapacityBuildingComponent},
  {path: 'photos', component: PhotosComponent},
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
