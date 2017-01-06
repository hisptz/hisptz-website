import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../providers/product.service";
import {Product} from "../../models/product";

export const PRODUCTS = [
    "idashboard","scorecard","ibrowser","resourcesearch","dhis2touch"
]
@Component({
  selector: 'featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent implements OnInit {

  featuredProduct: Product;
  loading: boolean;
  hasError: boolean;
  constructor(private productService: ProductService) {
    this.loading = true;
    this.hasError = false;
  }

  ngOnInit() {
    let featuredProductID = PRODUCTS[Math.floor((Math.random() * PRODUCTS.length) + 0)];
    this.productService.find(featuredProductID).subscribe((product) => {
      this.featuredProduct = product;
      this.loading = false;
      this.hasError = false;
    }, error => {
      this.loading = false;
      this.hasError = true;
    })
  }

}
