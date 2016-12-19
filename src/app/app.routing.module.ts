import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  {path: 'products', component: ProductsComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent}
  // { path: 'kopa', loadChildren: 'app/borrower/borrower.module#BorrowerModule' },
  // { path: 'wekeza', loadChildren: 'app/invest/invest.module#InvestModule' },
  // { path: '**',redirectTo: 'HomeComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
